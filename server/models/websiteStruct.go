package models

import "gorm.io/gorm"

type Website struct {
	gorm.Model
	UserID       uint
	Domain       string `gorm:"unique"` 
	StorageLimit int    
	Status       string 
	User         User   `gorm:"foreignKey:UserID"` 
}


type ModelWeb struct {
	Name                string `json:"name"`
	ProgrammingLanguage string `json:"programminglanguage"`
	Framework           string `json:"framework"`
}