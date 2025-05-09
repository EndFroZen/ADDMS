package models

import (
	"time"

	"gorm.io/gorm"
)

type Website struct {
	gorm.Model
	UserID       uint
	StorageLimit int
	Status       string
	User         User `gorm:"foreignKey:UserID"`
	Domain_id    uint
	Domain       Domain `gorm:"foreignKey:Domain_id"`
}

type ModelWeb struct {
	Name                string `json:"name"`
	ProgrammingLanguage string `json:"programminglanguage"`
	Framework           string `json:"framework"`
}

type Domain struct {
	gorm.Model
	Domain_name string
	Is_verified string
	Ssl_enabled string
}

type Files struct {
	gorm.Model
	Website_id uint
	Path       string
	Website    Website `gorm:"foreignKey:Website_id"`
}

type Server_status struct {
	gorm.Model
	Website_id uint
	Website    Website `gorm:"foreignKey:Website_id"`
	Ram_usage  float64
	Uptime     time.Time
	LastCheck  time.Time
}

type Activity_logs struct {
	gorm.Model
	UserID     uint
	User       User `gorm:"foreignKey:UserID"`
	Website_id uint
	Website    Website `gorm:"foreignKey:Website_id"`
	Action     string
	Details    string
}

type Plugins struct {
	gorm.Model
	Name        string
	Description string
	Version     string
	UserID      uint
	User        User `gorm:"foreignKey:UserID"`
	Website_id  uint
	Website     Website `gorm:"foreignKey:Website_id"`
}

type Notifications struct {
	gorm.Model
	UserID  uint
	User    User `gorm:"foreignKey:UserID"`
	Title   string
	Massage string
	Type    string
	Is_read bool
	
}
