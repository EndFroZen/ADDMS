package controllerGet

import (
	"fmt"
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func Showdashboard(c *fiber.Ctx) error {
	// load website
	userID := c.Locals("user_id").(float64)
	newUserID := int(userID)
	dataUser := service.LoadUserDataByID(newUserID, config.DB)
	dataWebsite, err := service.LoadUserWebsiteByID(newUserID, config.DB)
	if err != nil {
		fmt.Println(err)
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "load data website err"))
	}
	//check storage folder
	storage, err := service.CheckStoragefolder(dataUser.Folder)
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "load data storage website "))
	}
	var websites []fiber.Map
	for _, site := range dataWebsite {
		websites = append(websites, fiber.Map{
			"id":               site.ID,
			"domain":           site.Domain,
			"status":           site.Status,
			"storage_limit":    site.StorageUsage,
			"created_at":       site.CreatedAt,
			"programinglangue": site.ProgrammingLanguage,
			"framwork":         site.Framework,
			"port":             site.Port,
			"start_server":     site.StartServer,
			"pid":              site.Pid,
		})
	}
	service.ReloadRecodeIsOnline(config.DB)
	return c.JSON(fiber.Map{
		"name":    dataUser.Username,
		"folder":  dataUser.Folder,
		"email":   dataUser.Email,
		"storage": storage,
		"website": websites,
		"storage_limit": dataUser.StorageLimit,
	})
}
