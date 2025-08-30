package controllerGet

import (
	"fmt"
	"server/config"
	"server/service"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetNotification(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)

	data, err := service.LoadNotiByUserId(int(dataUser.ID), config.DB)
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
			"id":        site.ID,
			"type":      site.Type,
			"massage":   site.Massage,
			"colorcode": site.ColorCode,
			"title":     site.Title,
			"time":      timeStr,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"notification": noti,
	})
}

// ฟังก์ชันแปลงเวลาเป็นข้อความ human-readable
func formatElapsedTime(d time.Duration) string {
	if d < time.Minute {
		return fmt.Sprintf("%d seconds ago", int(d.Seconds()))
	} else if d < time.Hour {
		return fmt.Sprintf("%d minutes ago", int(d.Minutes()))
	} else if d < 24*time.Hour {
		return fmt.Sprintf("%d hours ago", int(d.Hours()))
	} else if d < 30*24*time.Hour {
		return fmt.Sprintf("%d days ago", int(d.Hours()/24))
	} else if d < 365*24*time.Hour {
		return fmt.Sprintf("%d months ago", int(d.Hours()/(24*30)))
	} else {
		return fmt.Sprintf("%d years ago", int(d.Hours()/(24*365)))
	}
}
