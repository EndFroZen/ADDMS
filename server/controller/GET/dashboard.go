package controllerGet

import (
	"fmt"
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func Showdashboard(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	newUserID := int(userID)
	fmt.Println(userID)
	dataUser := service.LoadUserDataByID(newUserID, config.DB)
	dataWebsite, err := service.LoadUserWebsiteByID(newUserID, config.DB)
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "load data website err"))
	}
	var websites []fiber.Map
	for _, site := range dataWebsite {
		websites = append(websites, fiber.Map{
			"id":            site.ID,
			"domain":        site.Domain,
			"status":        site.Status,
			"storage_limit": site.StorageLimit,
			"created_at":    site.CreatedAt,
		})
	}
	return c.JSON(fiber.Map{
		"name":   dataUser.Username,
		"folder": dataUser.Folder,
		"email":  dataUser.Email,
		"website":websites,
	})
}
