package service_create

import (
	"fmt"
	"os"
	"server/models"
)

func CreateNodeJS(path string, userData *models.User) error {
	newPath := fmt.Sprintf("../corefolder/%s/%s", userData.Folder, path)
	err := os.MkdirAll(newPath, 0755)
	if err != nil {
		return err
	}
	return nil
}
