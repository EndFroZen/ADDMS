package controllerGet

import (
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func GetListAllUser(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	if dataUser.Role != "admin" {
		return c.Status(fiber.ErrUnauthorized.Code).JSON(service.SimpleStatus(401, "You are not authorized to access this resource"))
	}

	var users []models.User
	if err := config.DB.Find(&users).Error; err != nil {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, "Failed to retrieve users"))
	}
	return c.JSON(fiber.Map{
		"status":  200,
		"message": "Success",
		"data":    users,
	})
}
