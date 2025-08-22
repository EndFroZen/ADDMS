package controllerPost

import (
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func StartServer(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	var req models.StartServer
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(service.SimpleStatus(400, "Invalid request body: "+err.Error()))
	}
	if req.Command == "" || req.Path == "" {
		return c.Status(fiber.StatusBadRequest).JSON(service.SimpleStatus(400, "Missing required fields"))
	}
	// start server logic
	if err := service.StartServerLogic(req.Command, dataUser, req.Path); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "Failed to start server: "+err.Error()))
	}
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "Server started successfully"))
}
