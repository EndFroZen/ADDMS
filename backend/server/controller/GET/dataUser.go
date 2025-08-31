package controllerGet

import (
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func DataUserByJWT(c *fiber.Ctx)error  {
	userID := c.Locals("user_id").(float64)
	newUserID := int(userID)
	dataUser := service.LoadUserDataByID(newUserID, config.DB)
	return c.JSON(fiber.Map{
		"status":  200,
		"username":dataUser.Username,
		"email":dataUser.Email,
		"folder":dataUser.Folder,
		"role":dataUser.Role,
		"storage":dataUser.StorageLimit,
	})
}