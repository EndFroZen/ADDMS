package controllerPost

import (
	"server/config"
	"server/models"
	"server/service"
	service_create "server/service/createweb"

	"github.com/gofiber/fiber/v2"
)

func CreateNewWebsite(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	var data models.ModelWeb
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to parse request body",
		})
	}
	err := service_create.NodejsCreateWeb(&dataUser,&data,config.DB)
	if err != nil{
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400,"Create website fales"))
	}
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200,"Create website seccessful"))
}
