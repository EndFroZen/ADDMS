package controller

import (
	"fmt"
	"os/exec"

	"github.com/gofiber/fiber/v2"
)

func Start(c *fiber.Ctx) error {
	server := c.Params("server")
	fmt.Println(server)

	if server == "nextjs" {
		cmd := exec.Command("cmd", "/C", "cd ../../webpage && npm run dev")
		output, err := cmd.CombinedOutput()
		fmt.Println(string(output))
		if err != nil {
			return c.JSON(fiber.Map{
				"status":  "error",
				"message": string(output),
			})
		}
		// Return the URL for the client to navigate
		return c.JSON(fiber.Map{
			"status": "success",
			"url":    "http://127.0.0.1:8000",
		})
	}

	// Default response if server is not "nextjs"
	return c.JSON(fiber.Map{
		"status": "success",
		"url":    "http://127.0.0.1:8000",
	})
}
