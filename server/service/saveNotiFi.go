package service

import (
	"fmt"
	"server/models"

	"gorm.io/gorm"
)

func SaveNotification(db *gorm.DB, id uint, title string, massege string, stype string, coler int) error {

	data := &models.Notifications{
		UserID:    id,
		Title:     title,
		Massage:   massege,
		Type:      stype,
		ColorCode: coler,
	}
	result := db.Create(data)
	if result.Error != nil {
		return fmt.Errorf("cant't push record")
	}
	fmt.Print("daiwdufaiwdtfaow7dfawdy")
	return nil
}
