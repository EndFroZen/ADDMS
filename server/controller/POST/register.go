package controllerPost

import (
	"server/config"
	"server/models"
	"server/service"
	service_user "server/service/user"

	"github.com/gofiber/fiber/v2"
)

func Register(c *fiber.Ctx) error {
	registerUser := new(models.User)
	if err := c.BodyParser(registerUser); err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "Missing body client"))
	}
	if err := service_user.Register(config.DB, registerUser); err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "Registration failed or User already exists"))
	}
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "Register successful"))
}
