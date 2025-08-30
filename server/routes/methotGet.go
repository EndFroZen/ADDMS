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
	routes.Get("/somewebsite", middleware.JWTProtected(), controllerGet.SomeWebsite)
	routes.Get("/datauser",middleware.JWTProtected(),controllerGet.DataUserByJWT)
	routes.Get("/allWebCommand",middleware.JWTProtected(),controllerGet.AllWebCommand)
	routes.Get("/reloadnginx",middleware.JWTProtected(),controllerGet.ReloadNginx)
	routes.Get("/hostdata",controllerGet.HostData)
	routes.Get("/getnotification",middleware.JWTProtected(),controllerGet.GetNotification)
	routes.Get("/getplugin",middleware.JWTProtected(),controllerGet.GetPlugin)
	// routes.Get("/getrunserver",middleware.JWTProtected(),controllerGet.Getrunserver)
} 
