package controllerGet

import (
	"fmt"
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func CheckSSL(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	var dataWebDomain []models.Website
	result := config.DB.Where("user_id = ?", dataUser.ID).Preload("Domain").Find(&dataWebDomain)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(service.SimpleStatus(404, "Not found recode."))
	}
	for _, website := range dataWebDomain {
		if website.Domain.Ssl_enabled == "true" && website.Domain.Is_verified != "true" {
			err := service.SslCreate(config.DB, website.Domain)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "SSL err"))
			}
			if err := service.SaveNotification(config.DB, dataUser.ID, "SSL certificate", "SSL is verlify", "Create", 3); err != nil {
				return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, fmt.Sprint(err)))
			}
		}
	}

	return c.Status(fiber.StatusOK).JSONP(service.SimpleStatus(200, "Check SSL sucsessfull"))
}
