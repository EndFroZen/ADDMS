package service

import (
	"fmt"
	"server/models"

	"gorm.io/gorm"
)

func ReCheckAndUpdateStorage(UserID uint, db *gorm.DB) error {
	var websites []models.Website
	result := db.Preload("Domain").Preload("User").Where("user_id = ?", UserID).Find(&websites);
	if result.Error != nil {
		// fmt.Println(result.Error)
		return result.Error
	}
	// fmt.Println("ReCheck and Update Storage for UserID:", UserID)
	for _, website := range websites {
		storage, err := CheckStoragefolderSome(website.User.Folder, website.Domain.Domain_name)
		// fmt.Println("Website ID:", website.ID, "Domain:", website.Domain.Domain_name, "Storage:", storage)
		if err != nil {
			// fmt.Println(err)
			return err
		}
		fmt.Println(website.Domain.Domain_name," : ",storage)
		// อัพเดต storage usage ของ website
		if err := db.Model(&website).Update("storage_usage", storage).Error; err != nil {
			return err
		}
	}

	return nil
}
