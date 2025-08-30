package controllerPost

import (
	"fmt"
	"server/config"
	"server/models"
	"server/service"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Installplugin(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)

	req := new(models.InstallPluginModel)
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, fmt.Sprint(err)))
	}
	checkDoaminName := strings.Split(req.Path, "/")
	fmt.Println(checkDoaminName)
	dataDoaminName, _ := service.LoadSingleDomain(checkDoaminName[0], config.DB)
	dataWebSite, _ := service.LoadUserSomeWebsiteByidOFDomain(int(dataDoaminName.ID), config.DB)
	newPath := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), dataUser.Folder, req.Path)
	// fmt.Println(req.Command)
	messageOutput, err := service.InstallpluginLogic(req.Command, newPath)
	if err != nil {
		dataInsatll := models.InstallPluginModel{
			UserID:    dataUser.ID,
			WebsiteID: dataWebSite.ID,
			Command:   req.Command,
			Path:      req.Path,
			Message:   messageOutput,
		}
		result := config.DB.Create(&dataInsatll)
		if result.Error != nil {
			return err
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": func() string {
				if messageOutput != "" {
					return messageOutput
				}
				return err.Error()
			}(),
			"path":    req.Path,
			"commnad": req.Command,
		})
	}
	dataInsatll := models.InstallPluginModel{
		UserID:    dataUser.ID,
		WebsiteID: dataWebSite.ID,
		Command:   req.Command,
		Path:      req.Path,
		Message:   messageOutput,
	}
	result := config.DB.Create(&dataInsatll)
	if result.Error != nil {
		return err
	}
	if err := service.SaveNotification(config.DB, dataUser.ID, fmt.Sprintf("Intsall : %s", dataInsatll.Command), fmt.Sprintf("Website : %s Install plugin successfull : %s", req.Path, messageOutput), "Install New plugin successfull ", 3); err != nil {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(service.SimpleStatus(500, fmt.Sprint(err)))
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": messageOutput,
		"path":    req.Path,
		"commnad": req.Command,
	})
}
