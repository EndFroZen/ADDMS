package routes

import (
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	methotPost(api)
	methotGet(api)
	methotDelete(api)
}
