package controllerGet

import (
	"fmt"
	"server/config"
	"server/service"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetPlugin(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	req := c.Query("websiteid") 
	websiteID, _ := strconv.Atoi(req)
	fmt.Println(req)
	data, err := service.LoadPluginUseIDUserAndIdWebsite(int(dataUser.ID), websiteID, config.DB)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"massage": "Not found record",
		})
	}

	var noti []fiber.Map
	for _, site := range data {
		// คำนวณเวลาที่ผ่านมา
		elapsed := time.Since(site.CreatedAt)
		timeStr := formatElapsedTime(elapsed)

		noti = append(noti, fiber.Map{
			"id":      site.ID,
			"massage": site.Message,
			"command":site.Command,
			"path":site.Command,
			"time":    timeStr,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"plugin": noti,
	})
}
