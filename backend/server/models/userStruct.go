package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username         string `gorm:"unique"`
	Email            string `gorm:"unique"`
	Password         string
	Folder           string `gorm:"unique"`
	Role             string
	StorageLimit     float64 `json:"storage_limit"`
	SecretKey        string `gorm:"unique"`
	Website          []Website
}
