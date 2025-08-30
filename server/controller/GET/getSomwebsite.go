package controllerGet

import (
	"fmt"
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func SomeWebsite(c *fiber.Ctx) error {

	req := c.Query("website") 
	fmt.Println(req)
	idDomain, err := service.LoadSingleDomain(req, config.DB)
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404,"Not found website!!"))
	}
	
	dataWebSite,err := service.LoadUserSomeWebsiteByidOFDomain(int(idDomain.ID),config.DB)
	if err != nil{
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(404,"Not found website by domain !!"))
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":200,
		"messege":"searching Done",
		"data":dataWebSite,
	})
}
