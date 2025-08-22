package service

import (
	"fmt"
	"os"
	"path/filepath"
)

func AddSingleService(path string) error {
	// ดึง path ของโฟลเดอร์ เช่น "./main/user/onetest/hello"
	dir := filepath.Dir(path)

	// สร้างทุกโฟลเดอร์ใน path ถ้ายังไม่มี
	if err := os.MkdirAll(dir, 0755); err != nil {
		fmt.Println(err)
		return err
	}

	// สร้างไฟล์ใหม่แบบ exclusive (ห้ามมีอยู่แล้ว)
	file, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer file.Close()

	return nil
}
