package controllerGet

import (
	"fmt"
	"server/config"
	"server/service"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func AdminFolderReadTest(c *fiber.Ctx) error {
	path := c.Params("*")
	userID := c.Locals("user_id").(float64)
	dataUser := service.LoadUserDataByID(int(userID), config.DB)
	parts := strings.Split(path, "/")
	newPath := ""
	if i := strings.Index(path, "/"); i != -1 {
		newPath = path[i+1:]
	} else {
		newPath = path
	}
	if dataUser.Role != "admin" {
		return c.Status(fiber.ErrUnauthorized.Code).JSON(service.SimpleStatus(401, "You are not authorized to access this resource"))
	}
	directPath, err := service.SearchFileInFo(newPath, fmt.Sprintf("folder_%s", parts[0]))
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, "not found path"))
	}
	
	dataDomain ,err:= service.LoadSingleDomain(parts[1], config.DB)
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
