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
		registerUser := new(models.User)
		if err := c.BodyParser(registerUser);err != nil{
			return c.Status(fiber.ErrBadRequest.Code).JSON(function.SimpleStatus(400,"Missing body client"))
		}
		if err := usermanage.Register(config.DB ,registerUser) ;err != nil{
			return c.Status(fiber.ErrBadRequest.Code).JSON(function.SimpleStatus(400,"Registration failed or User already exists"))
		}
		return c.Status(fiber.StatusOK).JSON(function.SimpleStatus(200,"Register successful"))
	})
	app.Post("/login",func (c *fiber.Ctx)error  {
		loginUserNew  := new(models.User)
		if err := c.BodyParser(loginUserNew);err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(function.Statustoken(400, "Missing body client","null"))
			
		}
		token ,err := usermanage.Login(config.DB,loginUserNew)
		if err!=nil{
			return c.Status(fiber.StatusBadRequest).JSON(function.Statustoken(404, "Not found user!","nul"))
		}
		return c.Status(fiber.StatusOK).JSON(function.Statustoken(200, "Login successful",token))
	})
	app.Listen("127.0.0.1:3001")
}

