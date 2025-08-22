package main

import (
	"server/config"
	"server/routes"
	"server/service"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // หรือกำหนดเฉพาะ domain เช่น "http://localhost:3000"
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))
	config.ConnectDatabase()
	service.AutoCreateFolderWeb(config.DB)
	// serverNginx, err := service.LoadUserServers(config.DB)
	// if err != nil {
	// 	panic("Failed to load server configurations: " + err.Error())
	// }
	// if err := service.CreateNginxConfigs(serverNginx); err != nil {
	// 	panic("Failed to create Nginx configurations: " + err.Error())
	// }
	routes.SetupRoutes(app)
	app.Listen("127.0.0.1:5661")
}
