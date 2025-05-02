package service_user

import (
	"server/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Register(db *gorm.DB, registerUser *models.User) error {
	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	registerUser.Password = string(hashedPassword)

	// Create new user in DB
	result := db.Create(registerUser)
	return result.Error
}
