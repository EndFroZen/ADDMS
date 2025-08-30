package service_user

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"server/config"
	"server/models"
	"server/service"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Register(db *gorm.DB, registerUser *models.User)(string,error) {

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return "null",err
	}

	registerUser.Password = string(hashedPassword)
	registerUser.SecretKey = GenerateRandomKey(8)
	registerUser.StorageLimit= 2000
	fmt.Printf(registerUser.SecretKey)
	// Create new user in DB
	result := db.Create(registerUser)
	if result.Error != nil {
		return "null",result.Error
	}
	service.AutoCreateFolderWeb(config.DB)
	return registerUser.SecretKey ,nil
}
func GenerateRandomKey(length int) string {
	bytes := make([]byte, length)
	_, err := rand.Read(bytes)
	if err != nil {
		log.Fatal(err)
	}
	return hex.EncodeToString(bytes)
}
