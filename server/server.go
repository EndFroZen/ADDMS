package main

import (
	"server/config"
	"server/routes"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	config.ConnectDatabase()
	service.AutoCreateFolderWeb(config.DB)
	routes.SetupRoutes(app)
	app.Listen("127.0.0.1:5661")
}
