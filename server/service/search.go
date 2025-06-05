package service

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/gofiber/fiber/v2"
)

type FileInfo struct {
	Name     string    `json:"name"`
	Path     string    `json:"path"`
	Type     string    `json:"type"` // "file" or "folder"
	Size     int64     `json:"size"`
	Modified time.Time `json:"modified"`

}

func SearchFileInFo(path string, folder string ) (interface{}, error) {
	newPath := fmt.Sprintf("../corefolder/%s%s", folder, path)
	fmt.Println("Accessing:", newPath)

	info, err := os.Stat(newPath)
	if err != nil {
		return nil, err
	}

	if info.IsDir() {
		// อ่านรายการในโฟลเดอร์
		entries, err := os.ReadDir(newPath)
		if err != nil {
			return nil, err
		}

		var results []FileInfo

		for _, entry := range entries {
			entryInfo, err := entry.Info()
			if err != nil {
				continue
			}

			fileType := "file"
			if entryInfo.IsDir() {
				fileType = "folder"
			}
			
			
		
			results = append(results, FileInfo{
				Name:     entry.Name(),
				Path:     filepath.Join(path, entry.Name()),
				Type:     fileType,
				Size:     entryInfo.Size(),
				Modified: entryInfo.ModTime(),
			})
		}

		return results, nil
	}
	
	// ถ้าเป็นไฟล์ → อ่านเนื้อหา
	content, err := os.ReadFile(newPath)
	if err != nil {
		return nil, err
	}

	return fiber.Map{
		"name":     info.Name(),
		"path":     path,
		"type":     "file",
		"size":     info.Size(),
		"modified": info.ModTime(),
		"content":  string(content),
	}, nil
}
