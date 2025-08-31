package controllerPost

import (
	"fmt"
	"server/config"
	"server/models"
	"server/service"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func RenewPassword(c *fiber.Ctx) error {
	req := new(models.RenewPassword)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(service.SimpleStatus(400, "Missing body client"))
	}
	dataUser := new(models.User)
	result := config.DB.Where("secret_key = ?", req.Secretkey).First(dataUser)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(service.SimpleStatus(404, "Not found user"))
	}
	fmt.Println(dataUser.Username)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(service.SimpleStatus(500, "not hashed password"))
	}
	result = config.DB.Model(&models.User{}).Where("secret_key = ?",dataUser.SecretKey).Update("password",hashedPassword)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(service.SimpleStatus(404, "Not found user and can't not update password"))
	}
	return c.Status(fiber.StatusOK).JSON(service.SimpleStatus(200, "Update password successful"))
}
