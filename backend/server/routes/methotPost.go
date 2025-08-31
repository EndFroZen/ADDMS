package routes

import (
	controllerPost "server/controller/POST"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func methotPost(routes fiber.Router) {
	routes.Post("/register", controllerPost.Register)
	routes.Post("/login", controllerPost.Login)
	routes.Post("/create", middleware.JWTProtected(), controllerPost.CreateNewWebsite) //deploy new website
	routes.Post("/edit/singlefile", middleware.JWTProtected(), controllerPost.EditFile)
	routes.Post("/delete/singlefile", middleware.JWTProtected(), controllerPost.DeleteSingleFile)
	routes.Post("/add/singlefile", middleware.JWTProtected(), controllerPost.Addsinglefile)
	routes.Post("/add/singlefolder", middleware.JWTProtected(), controllerPost.Addsinglefolder)
	routes.Post("/startserver", middleware.JWTProtected(), controllerPost.StartServer)
	routes.Post("/stopserver", middleware.JWTProtected(), controllerPost.StopServer)
	routes.Post("/installplugin", middleware.JWTProtected(), controllerPost.Installplugin)
	routes.Post("/reset-password",controllerPost.RenewPassword)
	
}
