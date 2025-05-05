package controllerPost

import (
	"server/config"
	"server/models"
	"server/service"
	service_user "server/service/user"

	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	type loginRequest struct {
		Usernoun string `json:"usernoun"`
		Password string `json:"password"`
	}
	req := new(loginRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(service.Statustoken(400, "Missing body client", "null"))
	}
	loginUserNew := models.User{
		Email: req.Usernoun,
		Username: req.Usernoun,
		Password: req.Password,
	}
	
	token, err := service_user.Login(config.DB, &loginUserNew)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(service.Statustoken(404, "Not found user!", "nul"))
	}
	return c.Status(fiber.StatusOK).JSON(service.Statustoken(200, "Login successful", token))

}
