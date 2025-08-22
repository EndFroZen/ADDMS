package service

import (
	"os"
)

func DeleteFileByPath(path string) error {
	err := os.Remove(path)
	if err != nil {
		return err
	}
	return nil
}
