package service_create

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

func CreateConfigPort(path string, port int) error {
	data := map[string]int{
		"port": port,
	}

	jsonBytes, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return fmt.Errorf("marshal json error: %v", err)
	}

	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("cannot create directory %s: %v", dir, err)
	}

	if err := os.WriteFile(path, jsonBytes, 0644); err != nil {
		return fmt.Errorf("write file error: %v", err)
	}

	return nil
}

