package main

import (
	"server/controller"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	links := []string{
		"http://localhost:3000",
		"http://localhost:3001",
	}
	app.Get("/home",func(c *fiber.Ctx) error {
		return c.SendFile("./views/home/home.html")
	})
	app.Get("/status", func(c *fiber.Ctx) error {
		return c.SendFile("./views/status/status.html")
	})
	app.Get("/check-status", func(c *fiber.Ctx) error {
		return controller.StatusServer(c, links)
	})

	app.Listen("127.0.0.1:3020")
}
