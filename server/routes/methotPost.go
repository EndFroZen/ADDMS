package routes

import (
	controllerPost "server/controller/POST"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func methotPost(routes fiber.Router) {
	routes.Post("/register", controllerPost.Register)
	routes.Post("/login", controllerPost.Login)
	routes.Post("/create",middleware.JWTProtected(),controllerPost.CreateNewWebsite)

}
