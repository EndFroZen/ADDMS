package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func JWTProtected() fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenString := c.Get("Authorization")
		// fmt.Println(tokenString)
		if tokenString == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Missing token"})
		}
		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		} else {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid token format"})
		}
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SEC")), nil
		})

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid token"})
		}

		claims := token.Claims.(jwt.MapClaims)
		c.Locals("user_id", claims["user_id"])
		c.Locals("username", claims["username"])
		c.Locals("email", claims["email"])
		return c.Next()
	}
}
