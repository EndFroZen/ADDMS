package main

import (
	"server/config"
	"server/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	config.ConnectDatabase()
	routes.SetupRoutes(app)
	app.Listen("127.0.0.1:5661")
}
