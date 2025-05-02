package controllerGet

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func ShowHello(c *fiber.Ctx) error{
	userID := c.Locals("user_id")
	userName := c.Locals("username")
	userEmail := c.Locals("email")
	data := fmt.Sprintf("%v %s %s",userID, userName,userEmail)
	return c.SendString(data)
}