package models

import "gorm.io/gorm"

type Website struct {
	gorm.Model
	UserID       uint
	Domain       string `gorm:"unique"` 
	Framework    string 
	StorageLimit int    
	Status       string 
	User         User   `gorm:"foreignKey:UserID"` 
}
