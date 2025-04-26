package usermanage

import (
	"fmt"
	"os"
	"server/models"
	"time"

	"github.com/golang-jwt/jwt/v4"
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
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	t, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return t, nil
}
