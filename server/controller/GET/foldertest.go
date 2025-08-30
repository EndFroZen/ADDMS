package controllerGet

import (
	"server/config"
	"server/service"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func FolderReadTest(c *fiber.Ctx) error {
	path := c.Params("*")
	userID := c.Locals("user_id").(float64)
	dataUser := service.LoadUserDataByID(int(userID), config.DB)
	directPath, err := service.SearchFileInFo(path, dataUser.Folder)
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, "not found path"))
	}
	parts := strings.Split(path, "/")
	dataDomain ,err:= service.LoadSingleDomain(parts[0], config.DB)
	if err != nil || dataDomain == nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, "not found domain"))
	}
	dataWebsite, err := service.LoadUserSomeWebsiteByid(int(dataDomain.ID), config.DB)
	if err != nil || dataWebsite == nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, "not found website"))
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  200,
		"message": "seach successfull in path",
		"path":    path,
		"type":    "folder",
		"data":    directPath,
		"website": dataWebsite,
	})
}
