package controllerPost

import (
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

// Struct สำหรับ request update
type UpdateUserRequest struct {
	ID           uint    `json:"id"`
	Role         string  `json:"role"`
	StorageLimit float64 `json:"storage_limit"`
}

func UpdateUser(c *fiber.Ctx) error {
	// ตรวจสอบ user_id จาก Locals
	userID, ok := c.Locals("user_id").(float64)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(service.SimpleStatus(401, "User not authenticated"))
	}
	intUserID := int(userID)

	// โหลดข้อมูลผู้ใช้ที่ทำการ request
	currentUser := service.LoadUserDataByID(intUserID, config.DB)
	// ตรวจสอบสิทธิ์ admin
	if currentUser.Role != "admin" {
		return c.Status(fiber.StatusForbidden).JSON(service.SimpleStatus(403, "You are not admin"))
	}

	// Parse request body
	req := new(UpdateUserRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(service.SimpleStatus(400, "Invalid request body"))
	}

	// ตรวจสอบว่าผู้ใช้ที่ต้องการอัปเดตมีอยู่จริง
	var user models.User
	if err := config.DB.First(&user, req.ID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(service.SimpleStatus(404, "User not found"))
	}

	// ทำการอัปเดต Role และ StorageLimit
	if err := config.DB.Model(&user).Updates(map[string]interface{}{
		"role":          req.Role,
		"storage_limit": req.StorageLimit,
	}).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "Update failed, please try again"))
	}

	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "User updated successfully"))
}
