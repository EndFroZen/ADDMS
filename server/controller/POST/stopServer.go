package controllerPost

import (
	"fmt"
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func StopServer(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	req := new(models.StopServerModel)
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "not thing have in request"))
	}
	//logic stop server
	err := service.StopServerLogic(req.Pid)
	if err != nil {
		if err := service.SaveNotification(config.DB, dataUser.ID, "Stop Server", "Stop server fales", "Run serve", 2); err != nil {
			return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, fmt.Sprint(err)))
		}
		return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, fmt.Sprint(err)))
	}
	websiteHave := new(models.Website)
	result := config.DB.Where("pid = ?", req.Pid).Find(&websiteHave)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(service.SimpleStatus(404, "No record found !!"))
	}
	if err := service.SingleReloadRecodeIsOnline(websiteHave.Port, config.DB); err != nil {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, "reload error"))
	}
	if err := service.SaveNotification(config.DB, dataUser.ID, "Stop Server", "Stop server Successful", "Run serve", 4); err != nil {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, fmt.Sprint(err)))

	}
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "stop server  succsesfull"))
}
