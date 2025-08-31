package controllerGet

import (
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func GetUserResource(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)

	var allOfUserWebsite []models.Website
	result := config.DB.Where("user_id = ?", dataUser.ID).Find(&allOfUserWebsite)
	if result.Error != nil {
		return result.Error
	}
	finalcpu := 0.0
	finalram := 0.0
	for i := range allOfUserWebsite {
		if allOfUserWebsite[i].Pid != 0{
			cpu,ram,_ := service.CheckUseresouseByPid(allOfUserWebsite[i].Pid)

			finalcpu += cpu
			finalram += ram
		}
	}
	return c.JSON(fiber.Map{
		"cpu": finalcpu,
		"ram": finalram,
	})
}

	