package routes

import (
	controllerGet "server/controller/GET"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func methotGet(routes fiber.Router) {
	routes.Get("/hello", middleware.JWTProtected(), controllerGet.ShowHello)
	routes.Get("/dashboard",middleware.JWTProtected(),controllerGet.Showdashboard)
	routes.Get("/file/*",middleware.JWTProtected(),controllerGet.FolderReadTest)
}
