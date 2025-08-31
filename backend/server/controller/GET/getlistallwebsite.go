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
	if dataUser.Role != "admin" {
		return c.Status(fiber.ErrUnauthorized.Code).JSON(service.SimpleStatus(401, "You are not authorized to access this resource"))
	}

	var websites []models.Website
	if err := config.DB.Preload("Domain").Preload("User").Preload("StartServer").Find(&websites).Error; err != nil {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, "Failed to retrieve websites"))
	}

	// เพิ่ม resource ของแต่ละเว็บ
	type WebsiteWithResource struct {
		models.Website
		Resource interface{} `json:"resource"`
	}

	var result []WebsiteWithResource
	for _, w := range websites {
		
		var resource interface{}
		// ดึง resource ของแต่ละเว็บ (สมมติว่ามี service หรือ method สำหรับดึง resource)
		cpu, ram, err := service.CheckUseresouseByPid(int(w.Pid))
		if err != nil {
			cpu =0
			ram =0
		}
		resource = fiber.Map{
			"cpu": cpu,
			"ram": ram,
		}
		result = append(result, WebsiteWithResource{
			Website:  w,
			Resource: resource,
		})
	}

	return c.JSON(fiber.Map{
		"status":  200,
		"message": "Success",
		"data":    result,
	})
}
