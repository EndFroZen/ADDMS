package controllerGet

import (
	"fmt"
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func ReloadNginx(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	if dataUser.ID == 0 {
		return c.Status(fiber.StatusUnauthorized).JSON(service.SimpleStatus(401, "Unauthorized access"))
	}

	//load port and domain from database
	contextServer, err := service.LoadUserWebsiteByID(int(dataUser.ID), config.DB)
	if contextServer == nil {
		return c.Status(fiber.StatusNotFound).JSON(service.SimpleStatus(404, "No websites found for user"))
	}
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "Error loading user websites"))
	}
	// สร้าง Nginx config

	err = service.CreateUserNginxConfig(contextServer, &dataUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, fmt.Sprintf("Error creating Nginx config: %v", err)))
	}
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "Nginx reload initiated"))
}
