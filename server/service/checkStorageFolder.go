package service

import (
	"bytes"
	"fmt"
	"os/exec"
	"strconv"
	"strings"
)
func CheckStoragefolderSome(mainPath string,path string) (float64, error) {
	// สร้าง path ไปที่ corefolder
	fullPath := fmt.Sprintf("../corefolder/%s/%s",mainPath, path)
	// fmt.Println("Check Storage Path : ",fullPath)
	// ใช้คำสั่ง du -sh
	cmd := exec.Command("du", "-sh", fullPath)

	var out bytes.Buffer
	cmd.Stdout = &out

	if err := cmd.Run(); err != nil {
		return 0, err
	}

	// ตัวอย่าง output: "123M\t../corefolder/folder_jojo"
	output := strings.Fields(out.String())
	if len(output) < 1 {
		return 0, fmt.Errorf("unexpected output from du")
	}

	// แยกตัวเลขและหน่วย เช่น "123M"
	sizeStr := output[0]

	// แปลงขนาดให้เป็น float64 MB
	sizeMB, err := parseHumanReadableSize(sizeStr)
	if err != nil {
		return 0, err
	}

	return sizeMB, nil
}
func CheckStoragefolder(path string) (float64, error) {
	// สร้าง path ไปที่ corefolder
	fullPath := fmt.Sprintf("../corefolder/%s", path)

	// ใช้คำสั่ง du -sh
	cmd := exec.Command("du", "-sh", fullPath)

	var out bytes.Buffer
	cmd.Stdout = &out

	if err := cmd.Run(); err != nil {
		return 0, err
	}

	// ตัวอย่าง output: "123M\t../corefolder/folder_jojo"
	output := strings.Fields(out.String())
	if len(output) < 1 {
		return 0, fmt.Errorf("unexpected output from du")
	}

	// แยกตัวเลขและหน่วย เช่น "123M"
	sizeStr := output[0]

	// แปลงขนาดให้เป็น float64 MB
	sizeMB, err := parseHumanReadableSize(sizeStr)
	if err != nil {
		return 0, err
	}

	return sizeMB, nil
}
func parseHumanReadableSize(size string) (float64, error) {
	unit := size[len(size)-1]
	valueStr := size[:len(size)-1]

	// ถ้าขนาดไม่มีหน่วย เช่น 123456 (bytes)
	if unit >= '0' && unit <= '9' {
		return strconv.ParseFloat(size, 64) // bytes
	}

	value, err := strconv.ParseFloat(valueStr, 64)
	if err != nil {
		return 0, err
	}

	switch unit {
	case 'K':
		return value / 1024.0, nil
	case 'M':
		return value, nil
	case 'G':
		return value * 1024.0, nil
	default:
		return 0, fmt.Errorf("unknown size unit: %c", unit)
	}
}
