package models

import "gorm.io/gorm"

type StopServerModel struct {
	Pid int `json:"pid"`
}

type InstallPluginModel struct {
	gorm.Model
	UserID    uint    `json:"user_id"`   // foreign key
	User      User    `gorm:"foreignKey:UserID"`
	WebsiteID uint    `json:"website_id"` // foreign key
	Website   Website `gorm:"foreignKey:WebsiteID"`
	Path      string  `json:"path"`
	Command   string  `json:"command"`
	Message   string  `json:"message"`
}

type RenewPassword struct {
	Secretkey string `json:"secretkey"`
	NewPassword string `json:"renewpassword"`
}