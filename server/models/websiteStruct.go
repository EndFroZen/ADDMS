package models

import (
	"time"

	"gorm.io/gorm"
)

type Website struct {
	gorm.Model
	UserID              uint
	StorageUsage        float64
	Status              string
	ProgrammingLanguage string `json:"programminglanguage"`
	Framework           string `json:"framework"`
	User                User   `gorm:"foreignKey:UserID"`
	Domain              Domain `gorm:"foreignKey:Domain_id"`
	Domain_id           uint

	Port int `gorm:"uniqueIndex"`

	StartServer StartServer `gorm:"foreignKey:WebsiteID"` // One-to-One ชัดเจน
	Pid         int
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

type Notifications struct {
	gorm.Model
	UserID    uint
	User      User `gorm:"foreignKey:UserID"`
	Title     string
	Massage   string
	Type      string
	ColorCode int
}

type StartServer struct {
	gorm.Model
	Command   string
	Path      string
	WebsiteID uint // FK ไปหา Website
}

type ResourceUsage struct {
	gorm.Model
	UserID    uint
	User      User `gorm:"foreignKey:UserID"`
	CpuUsage  float64
	RamUsage  float64
	Timestamp time.Time
}
