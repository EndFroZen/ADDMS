package service

import (
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

func UpdateResouse(db *gorm.DB) {

}
