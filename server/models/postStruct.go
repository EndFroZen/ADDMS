package models

import "gorm.io/gorm"

type StartServer struct {
	gorm.Model
	Command   string  `json:"command"`
	Path      string  `json:"path"`
}
