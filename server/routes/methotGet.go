package routes

import (
	controllerGet "server/controller/GET"
	showapiapath "server/controller/GET/showApiaPath"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func methotGet(routes fiber.Router) {
	routes.Get("/hello", middleware.JWTProtected(), controllerGet.ShowHello)
	routes.Get("/dashboard",middleware.JWTProtected(),controllerGet.Showdashboard)
	routes.Get("/file/*",middleware.JWTProtected(),controllerGet.FolderReadTest)
	routes.Get("/showapipath",showapiapath.ShowApiPath)
	routes.Get("/showapipathjson",showapiapath.ShowApiPathJson)
	routes.Get("/datauser",middleware.JWTProtected(),controllerGet.DataUserByJWT)
} 
