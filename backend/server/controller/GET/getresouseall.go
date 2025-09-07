package controllerGet

import (
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func GetResource(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)

	var resource []models.ResourceUsage
	result := config.DB.Where("user_id = ?", dataUser.ID).Limit(36).Order("created_at desc").Find(&resource)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"resource": "Not found record",
		})
	}
	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"resource": "No resource usage records found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"resource": resource,
	})
}
