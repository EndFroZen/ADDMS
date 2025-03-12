package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func main() {
	engine := html.New("./views", ".html")
	app := fiber.New(fiber.Config{
		Views: engine})
	app.Get("/home", func(c *fiber.Ctx) error {
		return c.Render("home",fiber.Map{
			"Pagename":"Home",
		})
	})
	app.Get("/crateserver", func(c *fiber.Ctx) error {
		return c.Render("create",fiber.Map{
			"Pagename":"Create",
		})
	})
	app.Listen("127.0.0.1:3002")
}
