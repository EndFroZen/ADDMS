package routes

import (
	controllerDelete "server/controller/DELETE"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func methotDelete(routes fiber.Router) {
	routes.Delete("/delete/website", middleware.JWTProtected(), controllerDelete.DeleteWebsite)
}
