package controllerGet

import (
	"os"

	"github.com/gofiber/fiber/v2"
)

func HostData(c *fiber.Ctx)error{
	serverHost := os.Getenv("SERVER_HOST")
	serverHostIp := os.Getenv("SERVER_HOST_IP")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"serverhost":serverHost,
		"serverhostip":serverHostIp,
	})
}