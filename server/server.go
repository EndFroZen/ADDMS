package main

import (
	"fmt"
	"server/function"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
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
	app.Listen("127.0.0.1:3001")
}
