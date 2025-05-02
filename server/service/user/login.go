package service_user

import (
	"fmt"
	"os"
	"server/models"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Login(db *gorm.DB, loginUser *models.User) (string, error) {
	jwtSecret := os.Getenv("JWT_SEC")
	if jwtSecret == "" {
		return "", fmt.Errorf("JWT_SEC environment variable not set")
	}

	// Find user by email
	firstUser := new(models.User)
	result := db.Where("email = ?", loginUser.Email).First(firstUser)
	if result.Error != nil {
		return "", result.Error
	}

	// Check password
	err := bcrypt.CompareHashAndPassword([]byte(firstUser.Password), []byte(loginUser.Password))
	if err != nil {
		return "", err
	}

	// Create JWT token
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["user_id"] = firstUser.ID
	claims["username"] = firstUser.Username
	claims["email"] = firstUser.Email
	claims["iat"] = time.Now().Unix()

	t, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return t, nil
}
