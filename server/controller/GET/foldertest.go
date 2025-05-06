package controllerGet

import (
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func FolderReadTest(c *fiber.Ctx) error {
	path := c.Params("*")
	userID := c.Locals("user_id").(float64)
	dataUser := service.LoadUserDataByID(int(userID),config.DB)
	directPath,err := service.SearchFileInFo(path,dataUser.Folder)
	if err != nil{
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404,"not found path"))
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  200,
		"message": "seach successfull in path",
		"path":path,
		"data":directPath,
	})
}
