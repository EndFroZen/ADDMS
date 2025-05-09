package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Email    string `gorm:"unique"`
	Password string	`json:"-"`
	Folder   string `gorm:"unique"`
	Role     string
	Website  []Website
}
