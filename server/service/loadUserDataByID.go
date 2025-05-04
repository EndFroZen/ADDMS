package service

import (
	"server/models"

	"gorm.io/gorm"
)

func LoadUserDataByID(id int, db *gorm.DB) models.User {
	data := models.User{}
	result := db.Where("id = ?", id).First(&data)
	if result.Error != nil {
		return models.User{}
	}
	return data
}
