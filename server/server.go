package main

import (
	"fmt"
	"server/config"
	"server/function"
	usermanage "server/function/userManage"
	"server/models"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	config.ConnectDatabase()
	app.Post("/createnewserver", func(c *fiber.Ctx) error {
		userID := c.Query("user")
		nameServer := c.FormValue("nameserver")
		programmingLanguage := c.FormValue("programming_language")
		framework := c.FormValue("framework")
		showdata := fmt.Sprintf("%s %s %s %s", userID, nameServer, programmingLanguage, framework)
		err := function.CreateServerFunction(nameServer,programmingLanguage,framework)
		if err != nil{
			return c.SendString(err.Error())
		}
		return c.SendString(showdata)
	})
	app.Post("/register",func (c *fiber.Ctx)error  {
		email := c.FormValue("email")
		username := c.FormValue("username")
		password := c.FormValue("password")
		registserUser := models.User{
			Email: email,
			Username: username,
			Password: password,
		}
		if err := usermanage.Register(config.DB ,&registserUser) ;err != nil{
			return c.SendString(fiber.ErrBadRequest.Message)
		}
		return c.SendString("register succesfull")
	})
	app.Post("/login",func (c *fiber.Ctx)error  {
		loginUserNew  := new(models.User)
		if err := c.BodyParser(loginUserNew);err != nil {
			return c.SendString(fiber.ErrBadRequest.Message)
		}
		token ,err := usermanage.Login(config.DB,loginUserNew)
		if err!=nil{
			return c.SendString(fiber.ErrBadRequest.Message)
		}
		return c.SendString(token)
	})
	app.Listen("127.0.0.1:3001")
}
