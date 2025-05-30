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
func LoadUserWebsiteByID(id int, db *gorm.DB) ([]models.Website, error) {
	var data []models.Website
	result := db.Preload("Domain").Where("user_id = ?", id).Find(&data)
	if result.Error != nil {
		return nil, result.Error
	}
	return data, nil
}

func LoadSingleDomain(domain string, db *gorm.DB) (*models.Domain, error) {
	data := &models.Domain{}
	result := db.Where("domain_name = ?", domain).First(data)
	if result.Error != nil {
		return nil, result.Error
	}
	return data, nil
}
