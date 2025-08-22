package service

import (
	"fmt"
	"os"
	"server/config"
	"server/models"
)

func EditFile(path, content, newPath string, user *models.User) error {
	targetPathOld := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, path)
	targetPathNew := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, newPath)
	//check if targetPathOld is already exit? if not, return error
	if _, err := os.Stat(targetPathOld); os.IsNotExist(err) {
		return fmt.Errorf("file %s does not exist", path)
	}
	if targetPathOld == targetPathNew {
		// Edit file content
		return os.WriteFile(targetPathOld, []byte(content), 0644)
	} else {
		// Write new content to the old file first
		if err := os.WriteFile(targetPathOld, []byte(content), 0644); err != nil {
			return err
		}
		// Rename file
		return os.Rename(targetPathOld, targetPathNew)
	}
}
