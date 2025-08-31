package controllerPost

import (
	"server/config"
	"server/models"
	"server/service"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func StartServer(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)
	var req models.StartServer
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(service.SimpleStatus(400, "Invalid request body: "+err.Error()))
	}
	if req.Command == "" || req.Path == "" {
		return c.Status(fiber.StatusBadRequest).JSON(service.SimpleStatus(400, "Missing required fields"))
	}
	//load datawebsite
	nameDomain := strings.Split(req.Path, "/")
	loadIDWebsiteFromDomain, err := service.LoadSingleDomain(nameDomain[0], config.DB)
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, "Not found website domain!!"))
	}
	dataWebsite, err := service.LoadUserSomeWebsiteByid(int(loadIDWebsiteFromDomain.ID), config.DB)
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404, "Not found website id!!"))
	}
	// start server logic
	pid, noti, err := service.StartServerLogic(req.Command, dataUser, req.Path, dataWebsite.Port)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "Failed to start server: "+err.Error()))
	}
	//save notification

	//save database
	result := config.DB.Create(&models.StartServer{
		WebsiteID: dataWebsite.ID,
		Command:   req.Command,
		Path:      req.Path,
	})
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "Failed to save server data: "+result.Error.Error()))
	}
	//up date pid in record
	if err := service.SingleReloadRecodeIsOnline(dataWebsite.Port, config.DB); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "reload Error"))
	}

	result = config.DB.Model(&models.Website{}).Where("id = ?", dataWebsite.ID).Update("pid", pid)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "Failed to update pid: "+result.Error.Error()))
	}
	finaldataNoti := &models.Notifications{
		UserID:    dataUser.ID,
		Title:     noti.Title,
		ColorCode: noti.ColorCode,
		Massage:   noti.Massage,
		Type:      noti.Type,
	}
	// จะทำการหาจนกว่าจะเจอเพราะว่าถ้าจะมาบรรทัดนี้ได้แสดงว่าสั่งทำงานสำเร็จ เพราะว่าตะกี้คือมันรันเสร็จนะแต่ว่าอีกสักพักมันก็มา
	result = config.DB.Create(finaldataNoti)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "Create err : "+result.Error.Error()))
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": noti,
	})
}
