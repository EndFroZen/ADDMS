package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username  string `gorm:"unique"`
	Email     string `gorm:"unique"`
	Password  string
	Folder    string `gorm:"unique"`
	Role      string
	SecretKey string `gorm:"unique"`
	Website   []Website
}
