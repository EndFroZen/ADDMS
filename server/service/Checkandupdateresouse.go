package service

import (
	"fmt"
	"server/models"
	"time"

	"github.com/shirou/gopsutil/process"
	"gorm.io/gorm"
)

func CheckUseresouseByPid(pid int) (float64, float64, error) {
	proc, err := process.NewProcess(int32(pid))
	if err != nil {
		return 0, 0, err
	}

	cpuPercent, err := proc.CPUPercent()
	if err != nil {
		return 0, 0, err
	}

	memInfo, err := proc.MemoryInfo()
	if err != nil {
		return 0, 0, err
	}

	ramMB := float64(memInfo.RSS) / 1024 / 1024 // แปลงจาก bytes เป็น MB

	return cpuPercent, ramMB, nil
}

func CreateResouse(db *gorm.DB) error {
	// โหลดข้อมูลผู้ใช้ทั้งหมด
	var users []models.User
	if err := db.Find(&users).Error; err != nil {
		return err
	}

	var resources []models.ResourceUsage

	for _, user := range users {
		// ดึงเว็บไซต์ทั้งหมดของผู้ใช้แต่ละคน
		var websites []models.Website
		if err := db.Where("user_id = ?", user.ID).Find(&websites).Error; err != nil {
			return err
		}

		totalCPU := 0.0
		totalRAM := 0.0

		for _, website := range websites {
			if website.Pid != 0 {
				cpuPercent, ramMB, err := CheckUseresouseByPid(website.Pid)
				if err != nil {
					// ข้ามเว็บไซต์ที่ error ไป
					continue
				}
				totalCPU += cpuPercent
				totalRAM += ramMB
			}
		}

		resource := models.ResourceUsage{
			UserID:    uint(user.ID),
			CpuUsage:  totalCPU,
			RamUsage:  totalRAM,
			Timestamp: time.Now(),
		}
		resources = append(resources, resource)
	}

	fmt.Println("run CreateResource (by user)")
	return db.Create(&resources).Error
}
