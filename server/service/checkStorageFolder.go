package service

import (
	"fmt"
	"os"
	"path/filepath"
)

func CheckStoragefolder(path string) (float64, error) {
	var totalSize int64 = 0
	newPath := fmt.Sprintf("../corefolder/%s",path)
	err := filepath.Walk(newPath, func(_ string, info os.FileInfo, err error) error {
		if err != nil {
			return err 
		}
		if !info.IsDir() {
			totalSize += info.Size()
		}
		return nil
	})

	if err != nil {
		return 0, err
	}

	
	return float64(totalSize) / 1024.0 / 1024.0, nil
}
