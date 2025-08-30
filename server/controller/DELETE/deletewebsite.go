package controllerDelete

import (
	"fmt"
	"server/config"
	noti "server/log"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

var notifileDeleteWebsite string = "controller/DELETE@deletewebsite"

func DeleteWebsite(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)

	//1. quarry data form link
	req := new(models.DeleteStruct)
	if err := c.BodyParser(req); err != nil {
		noti.LogNotic(1, notifileDeleteWebsite, "DeleteWebsite.19", fmt.Sprintf("%s", err))
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(422, fmt.Sprintf("%s", err)))
	}
	fmt.Println(dataUser.Username, req.Website)
	//2. do delete file and delete record
	if err := service.DeleteWebFuncService(req, &dataUser, config.DB); err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, fmt.Sprintf("Delete website error: %s", err)))
	}
	//3. return json
	if err := service.SaveNotification(config.DB, dataUser.ID, "Delete website", "Delete Website done", "Delete", 2); err != nil {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, fmt.Sprint(err)))
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"hello": req.Website,
	})
}
