package routes

import (
	controllerPost "server/controller/POST"

	"github.com/gofiber/fiber/v2"
)

func methotPost(routes fiber.Router) {

	routes.Post("/register", controllerPost.Register)
	routes.Post("/login", controllerPost.Login)

}
