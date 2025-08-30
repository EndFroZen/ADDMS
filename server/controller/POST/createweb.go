package controllerPost

import (
	"fmt"
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func CreateNewWebsite(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)

	var jsonReqStuct models.SaveStruct
	if err := c.BodyParser(&jsonReqStuct); err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "Failed to parse request body"))
	}
	
	if err := service.MakeWebsite(&jsonReqStuct, &dataUser); err != nil {
		
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, fmt.Sprintf("Create website false %s",err)))
	}
	if err := service.SaveNotification(config.DB, dataUser.ID, "New Deploy", fmt.Sprintf("New Deploy New Website : %s",jsonReqStuct.Domain_name), "Create", 3); err != nil {
			return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, fmt.Sprint(err)))
	}
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "Create website seccessful"))
}
