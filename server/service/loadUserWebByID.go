package service

import (
	"server/models"

	"gorm.io/gorm"
)

func LoadUserWebsiteByID(id int ,db *gorm.DB)([]models.Website, error){
	var data []models.Website
	result := db.Where("user_id = ?",id).Find(&data)
	if result.Error != nil{
		return nil ,result.Error
	}
	return data ,nil
}