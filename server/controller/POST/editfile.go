package controllerPost

import (
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func EditFile(c *fiber.Ctx) error {
	// Parse the request body into the EditFileRequest struct
	req := new(models.EditFileRequest)
	if err := c.BodyParser(&req); err != nil {
		return  c.Status(fiber.StatusBadRequest).JSON(service.SimpleStatus(400, "invalid body"))
	}
	// Get the user from the context
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	//do the edit file logic
	if err := service.EditFile(req.Path, req.Content, req.NewPath, &dataUser); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, err.Error()))
	}
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "editing successful"))
}
