package service

import (
	"fmt"
	"runtime"
	"server/models"
	"time"

	"github.com/shirou/gopsutil/process"
	"gorm.io/gorm"
)

// CheckUserResourceByPid จะคืน CPU (%) และ RAM (MB) ของ process
// ถ้า pid ที่ให้มาเป็น parent (เช่น firejail) จะรวมค่า child processes ทั้งหมด
func CheckUseresouseByPid(pid int) (float64, float64, error) {
	proc, err := process.NewProcess(int32(pid))
	if err != nil {
		return 0, 0, err
	}

	// หา child processes
	children, err := proc.Children()
	if err != nil {
		return 0, 0, err
	}

	// ถ้ามี child => รวมค่าของ child
	if len(children) > 0 {
		var totalCPU float64
		var totalRAM float64
		for _, child := range children {
			cpuPercent, err := child.CPUPercent()
			if err != nil {
				continue
			}
			memInfo, err := child.MemoryInfo()
			if err != nil {
				continue
			}
			ramMB := float64(memInfo.RSS) / 1024 / 1024

			totalCPU += cpuPercent
			totalRAM += ramMB
		}
		return totalCPU, totalRAM, nil
	}

	// ถ้าไม่มี child => ใช้ค่าของ process เอง
	cpuPercent, err := proc.CPUPercent()
	if err != nil {
		return 0, 0, err
	}

	memInfo, err := proc.MemoryInfo()
	if err != nil {
		return 0, 0, err
	}
	ramMB := float64(memInfo.RSS) / 1024 / 1024

	return cpuPercent, ramMB, nil
}

// สร้าง ResourceUsage ของผู้ใช้ทั้งหมด
func CreateResouse(db *gorm.DB) error {
	// โหลดข้อมูลผู้ใช้ทั้งหมด
	var users []models.User
	if err := db.Find(&users).Error; err != nil {
		return err
	}

	var resources []models.ResourceUsage

	cores := float64(runtime.NumCPU()) // จำนวน core ของเครื่อง

	for _, user := range users {
		// โหลดเว็บไซต์ของ user
		var websites []models.Website
		if err := db.Where("user_id = ?", user.ID).Find(&websites).Error; err != nil {
			return err
		}

		totalCPU := 0.0
		totalRAM := 0.0

		// รวม resource ของทุกเว็บไซต์
		for _, website := range websites {
			if website.Pid != 0 {
				cpuPercent, ramMB, err := CheckUseresouseByPid(website.Pid)
				if err != nil {
					// ข้ามถ้า error
					continue
				}
				totalCPU += cpuPercent
				totalRAM += ramMB
			}
		}

		// Normalize CPU usage ต่อ core
		normalizedCPU := totalCPU / cores
		if normalizedCPU > 100 {
			normalizedCPU = 100 // กันค่าเกิน
		}

		resource := models.ResourceUsage{
			UserID:    uint(user.ID),
			CpuUsage:  normalizedCPU,
			RamUsage:  totalRAM,
			Timestamp: time.Now(),
		}
		resources = append(resources, resource)
	}

	fmt.Println("run CreateResource (by user)")
	return db.Create(&resources).Error
}
