package controllerGet

import (
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func AllWebCommand(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	newUserID := int(userID)
	dataUser := service.LoadUserDataByID(newUserID, config.DB)
	websiteWithCommnad ,err :=  service.LoadUserWebsiteByID(int(dataUser.ID),config.DB)
	if err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "Error loading user websites"))
	}
	return c.JSON(websiteWithCommnad)
}
