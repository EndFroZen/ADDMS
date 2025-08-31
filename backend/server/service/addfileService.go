package service

import (
	"fmt"
	"os"
	"path/filepath"
)

func AddsingleFolderService(path string) error {
	// ถ้ามีอยู่แล้วและเป็นไฟล์ → error
	if _, err := os.Stat(path); err == nil {
		return fmt.Errorf("path already exists")
	}

	// สร้างโฟลเดอร์ (รวม parent ด้วย)
	if err := os.MkdirAll(path, 0755); err != nil {
		return fmt.Errorf("failed to create folder: %w", err)
	}
	return nil
}

func AddSingleFileService(path string) error {
	dir := filepath.Dir(path)

	// เช็กว่ามีโฟลเดอร์อยู่แล้วหรือยัง ถ้าไม่มีสร้างให้
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("failed to create parent folders: %w", err)
	}

	// ถ้า path ที่ให้มาเป็นโฟลเดอร์อยู่แล้ว → error
	if info, err := os.Stat(path); err == nil && info.IsDir() {
		return fmt.Errorf("path %s already exists and is a directory", path)
	}

	// สร้างไฟล์แบบ exclusive
	file, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("failed to create file: %w", err)
	}
	defer file.Close()

	return nil
}
