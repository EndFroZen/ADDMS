package service

import (
	"os"
)

func DeleteFileByPath(path string) error {
	err := os.RemoveAll(path)
	if err != nil {
		return err
	}
	return nil
}
