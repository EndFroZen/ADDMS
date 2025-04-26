package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func main() {
	engine := html.New("./views", ".html")
	app := fiber.New(fiber.Config{
		Views: engine})

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("dashboard", nil)
	})
	app.Get("/createserver", func(c *fiber.Ctx) error {
		return c.Render("creatpage", fiber.Map{
			"Pagename": "Create",
		})
	})

	app.Get("/login", func(c *fiber.Ctx) error {
		return c.Render("login", nil)
	})
	app.Get("/register", func(c *fiber.Ctx) error {
		return c.Render("register", nil)
	})

	app.Listen("127.0.0.1:3002")
}
