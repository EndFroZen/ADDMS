package service

import (
	"fmt"
	noti "server/log"
	"server/models"

	"gorm.io/gorm"
)
var notiFileLoaddata string = "service@loadata"
func LoadUserDataByID(id int, db *gorm.DB) models.User {
	data := models.User{}
	result := db.Where("id = ?", id).First(&data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata,"LoadUserDataByID.23", "no result")
		return models.User{}
	}
	return data
}
func LoadUserWebsiteByID(id int, db *gorm.DB) ([]models.Website, error) {
	var data []models.Website
	result := db.Preload("Domain").Where("user_id = ?", id).Find(&data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata,"LoadUserWebsiteByID.23", "no result")
		return nil, result.Error
	}
	return data, nil
}
func LoadUserSomeWebsiteByid(id int, db *gorm.DB) (*models.Website, error) {
	var data *models.Website
	result := db.Where("id = ", id).First(&data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata,"LoadUserSomeWebsiteByid.31", "no result")
		return nil, result.Error
	}
	return data, nil
}

func LoadSingleDomain(domain string, db *gorm.DB) (*models.Domain, error) {
	data := &models.Domain{}
	fmt.Println(domain)
	result := db.Where("domain_name = ?", domain).First(data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata,"LoadsingleDomain.40", "no result")
		return nil, result.Error
	}
	return data, nil
}


