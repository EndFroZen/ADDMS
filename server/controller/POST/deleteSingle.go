package controllerPost

import (
	"fmt"
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

type getbodyDelete struct {
	Path string `json:"path"`
}

func DeleteSingleFile(c *fiber.Ctx) error {
	//1.check user
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	//check body parser
	req := new(getbodyDelete)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, fmt.Sprintf("%s : Not have body request", err)))
	}

	newPath := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), dataUser.Folder, req.Path)
	if err := service.DeleteFileByPath(newPath); err != nil {
		fmt.Println(err)
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, fmt.Sprintf("%s : error for delete file", req.Path)))
	}
	
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, fmt.Sprintf("%s is Delete successfull", req.Path)))
}
