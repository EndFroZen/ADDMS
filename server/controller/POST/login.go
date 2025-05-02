package controllerPost

import (
	"server/config"
	"server/models"
	"server/service"
	service_user "server/service/user"

	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {

	loginUserNew := new(models.User)
	if err := c.BodyParser(loginUserNew); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(service.Statustoken(400, "Missing body client", "null"))
	}
	token, err := service_user.Login(config.DB, loginUserNew)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(service.Statustoken(404, "Not found user!", "nul"))
	}
	return c.Status(fiber.StatusOK).JSON(service.Statustoken(200, "Login successful", token))

}
