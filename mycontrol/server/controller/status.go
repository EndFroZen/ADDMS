package controller

import (
	"net/http"
	"sync"

	"github.com/gofiber/fiber/v2"
)


func StatusServer(c *fiber.Ctx, links []string) error {
	var wg sync.WaitGroup
	results := make([]map[string]string, 0)


	for _, link := range links {
		wg.Add(1)

		go func(link string) {
			defer wg.Done()
			resp, err := http.Get(link)
			status := "error"
			if err == nil {
				defer resp.Body.Close()
				status = "success"
			}

			results = append(results, map[string]string{
				"link":   link,
				"status": status,
			})
		}(link)
	}


	wg.Wait()


	return c.Status(fiber.StatusOK).JSON(results)
}
