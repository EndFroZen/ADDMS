package main

import (
	"server/addon"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	app.Post("/create",addon.CreateDomain)
	app.Listen("127.0.0.1:3001")
}
