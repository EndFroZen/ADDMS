package controllerGet

import (
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func GetListAllWebsite(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	// fmt.Println(dataUser.Role)
	if dataUser.Role != "admin" {
		return c.Status(fiber.ErrUnauthorized.Code).JSON(service.SimpleStatus(401, "You are not authorized to access this resource"))
	}

	var websites []models.Website
	if err := config.DB.Preload("Domain").Preload("User").Preload("StartServer").Find(&websites).Error; err != nil {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, "Failed to retrieve websites"))
	}
	return c.JSON(fiber.Map{
		"status":  200,
		"message": "Success",
		"data":    websites,
	})
}
