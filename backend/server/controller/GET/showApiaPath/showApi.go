package showapiapath

import "github.com/gofiber/fiber/v2"

func ShowApiPath(c *fiber.Ctx)error  {
	return	c.SendFile("./controller/GET/showApiaPath/showApi.html")
}

func ShowApiPathJson(c *fiber.Ctx)error{
	return c.SendFile("./controller/GET/showApiaPath/jsonAPI.json")
}
