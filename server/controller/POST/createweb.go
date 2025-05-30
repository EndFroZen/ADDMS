package controllerPost

import (
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
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "Create website false"))
	}

	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "Create website seccessful"))
}
