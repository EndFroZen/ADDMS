package controllerGet

import (
	"fmt"
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func Showdashboard(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	newUserID := int(userID)
	fmt.Println(userID)
	dataUser := service.LoadUserDataByID(newUserID, config.DB)

	return c.JSON(fiber.Map{
		"name":dataUser.Username,
		"folder":dataUser.Folder,
		"email":dataUser.Email,
	})
}
