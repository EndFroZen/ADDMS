package controllerPost

import (
	"fmt"
	"server/config"
	"server/service"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Addsinglefolder(c *fiber.Ctx) error {
	// 1. Check user
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)

	// 2. Parse request body
	req := new(getbodyfileadd)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(service.SimpleStatus(400, "invalid body"))
	}
	fmt.Println(req.Path)
	// 3. Validate path
	firstPart := strings.SplitN(req.Path, "/", 2)[0]
	haveDomain, err := service.LoadSingleDomain(firstPart, config.DB)
	if err != nil || haveDomain.Domain_name != firstPart {
		return c.Status(fiber.StatusNotFound).JSON(service.SimpleStatus(404, "domain not found or incorrect"))
	}

	// 4. Create folder
	newPath := fmt.Sprintf("../corefolder/%s/%s", dataUser.Folder, req.Path)
	if err := service.AddsingleFolderService(newPath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "failed to create folder"))
	}

	// 5. Success
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, fmt.Sprintf("add folder %s successful", req.Path)))
}
