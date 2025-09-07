package service

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

var allowedInstallCommands = []string{
    // Node.js
    "npm install",
    "npm i",
    "yarn add",
    "pnpm add",
	"npm init",

    // Python
    "pip install",
    "pip install -r requirements.txt",
    "pip install --upgrade",

    // Go (Modules)
    "go mod tidy",
    "go mod download",
    "go mod vendor",
    "go install",
	"go get",
	

    // PHP
    "composer require",
    "composer install",
    "composer update",
    "composer global require",
}


func InstallpluginLogic(command string, path string) (string, error) {
	if CheckIsBlacklisted(command) {
		return "", fmt.Errorf("command is not allowed")
	}

	if !isAllowcommand(command) {
		return "", fmt.Errorf("only install commands are allowed")
	}

	if _, err := os.Stat(path); os.IsNotExist(err) {
		return "", fmt.Errorf("path not found: %s", path)
	}

	parts := strings.Fields(command)
	if len(parts) == 0 {
		return "", fmt.Errorf("empty command")
	}

	cmd := exec.Command(parts[0], parts[1:]...)
	cmd.Dir = path

	output, err := cmd.CombinedOutput()
	if err != nil {
		return string(output), fmt.Errorf("failed to install plugin: %v", err)
	}

	return string(output), nil
}

func isAllowcommand(command string) bool {
	cmd := strings.ToLower(strings.TrimSpace(command))
	for _, allowed := range allowedInstallCommands {
		if strings.HasPrefix(cmd, allowed) {
			return true
		}
	}
	return false
}
