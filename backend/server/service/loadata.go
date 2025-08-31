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
		noti.LogNotic(2, notiFileLoaddata, "LoadUserDataByID.23", "no result")
		return models.User{}
	}
	return data
}
func LoadUserWebsiteByID(id int, db *gorm.DB) ([]models.Website, error) {
	var data []models.Website
	result := db.Preload("Domain").Preload("StartServer").Where("user_id = ?", id).Find(&data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata, "LoadUserWebsiteByID.23", "no result")
		return nil, result.Error
	}
	return data, nil
}

func LoadUserSomeWebsiteByid(id int, db *gorm.DB) (*models.Website, error) {
	var data *models.Website
	result := db.Preload("Domain").Preload("StartServer").Where("id = ?", id).First(&data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata, "LoadUserSomeWebsiteByid.31", "no result")
		return nil, result.Error
	}
	return data, nil
}
func LoadUserSomeWebsiteByidOFDomain(id int, db *gorm.DB) (*models.Website, error) {
	var data *models.Website
	result := db.Preload("Domain").Preload("StartServer").Where("domain_id  = ?", id).First(&data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata, "LoadUserSomeWebsiteByid.31", "no result")
		return nil, result.Error
	}
	return data, nil
}

func LoadSingleDomain(domain string, db *gorm.DB) (*models.Domain, error) {
	data := &models.Domain{}
	fmt.Println(domain)
	result := db.Where("domain_name = ?", domain).First(data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata, "LoadsingleDomain.40", "no result")
		return nil, result.Error
	}
	return data, nil
}

func LoadSingleStartServer(id uint, db *gorm.DB) (*models.StartServer, error) {
	data := &models.StartServer{}
	result := db.Where("id = ?", id).First(data)
	if result.Error != nil {
		noti.LogNotic(2, notiFileLoaddata, "LoadSingleStartServer.40", "no result")
		return nil, result.Error
	}
	return data, nil
}

func LoadNotiByUserId(id int, db *gorm.DB) ([]models.Notifications, error) {
	var data []models.Notifications
	fmt.Println(id)
	// โหลด 20 ข้อมูลล่าสุด
	result := db.Where("user_id = ?", id).
		Order("created_at DESC").
		Limit(20).
		Find(&data)

	if result.Error != nil {
		return nil, result.Error
	}

	return data, nil
}

func LoadPluginUseIDUserAndIdWebsite(id int, idwebsite int, db *gorm.DB) ([]models.InstallPluginModel, error) {
	var data []models.InstallPluginModel
	fmt.Println(id)
	// โหลด 20 ข้อมูลล่าสุด
	result := db.
		Where("user_id = ? AND website_id = ?", id, idwebsite).
		Order("created_at DESC").
		Limit(10).
		Find(&data)

	if result.Error != nil {
		return nil, result.Error
	}

	return data, nil
}
