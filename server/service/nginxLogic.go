package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"server/models"
	"text/template"
)

// Domain + port
type DomainConfig struct {
	Domain string
	Port   int
}

// User folder + domains
type UserServer struct {
	UserFolder string
	Domains    []DomainConfig
}

// Template Nginx
const nginxTemplate = `{{range .Domains}}
server {
    listen 80;
    server_name {{.Domain}}.endfrozen.site;

    location / {
        proxy_pass http://localhost:{{.Port}};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
{{end}}
`

// แปลง websites เป็น []UserServer
func convertToUserServer(websites []models.Website, user *models.User) []UserServer {
	serversMap := make(map[string][]DomainConfig)

	for _, w := range websites {
		folder := w.User.Folder
		if folder == "" {
			folder = user.Folder
		}
		serversMap[folder] = append(serversMap[folder], DomainConfig{
			Domain: w.Domain.Domain_name,
			Port:   w.Port,
		})
	}

	var servers []UserServer
	for folder, domains := range serversMap {
		servers = append(servers, UserServer{
			UserFolder: folder,
			Domains:    domains,
		})
	}

	return servers
}

// สร้าง Nginx config ใน folder ของ user (ไม่ต้อง root)
func CreateUserNginxConfig(websites []models.Website, user *models.User) error {
	servers := convertToUserServer(websites, user)

	// โฟลเดอร์ config ของ user
	userHome := os.Getenv("HOME")
	if userHome == "" {
		return fmt.Errorf("cannot determine user home directory")
	}
	configPath := filepath.Join(userHome, "nginx-users")
	if err := os.MkdirAll(configPath, 0755); err != nil {
		return err
	}

	tmpl, err := template.New("nginx").Parse(nginxTemplate)
	if err != nil {
		return fmt.Errorf("failed to parse nginx template: %w", err)
	}

	for _, server := range servers {
		var buf bytes.Buffer
		if err := tmpl.Execute(&buf, server); err != nil {
			return fmt.Errorf("failed to render template for %s: %w", server.UserFolder, err)
		}

		// เขียนไฟล์ config ลงโฟลเดอร์ user
		fileName := filepath.Join(configPath, server.UserFolder+".conf")
		if err := os.WriteFile(fileName, buf.Bytes(), 0644); err != nil {
			return fmt.Errorf("failed to write config: %w", err)
		}

		fmt.Println("Created config:", fileName)
	}

	// Test config + reload Nginx (ต้อง sudo)
	cmdTest := exec.Command("sudo", "nginx", "-t")
	if out, err := cmdTest.CombinedOutput(); err != nil {
		return fmt.Errorf("nginx test failed: %s", string(out))
	}

	cmdReload := exec.Command("sudo", "nginx", "-s", "reload")
	if out, err := cmdReload.CombinedOutput(); err != nil {
		return fmt.Errorf("nginx reload failed: %s", string(out))
	}

	fmt.Println("Nginx reloaded successfully!")
	return nil
}

// ฟังก์ชันทดสอบ print servers เป็น JSON
func DebugPrintServers(websites []models.Website, user *models.User) {
	servers := convertToUserServer(websites, user)
	b, _ := json.MarshalIndent(servers, "", "  ")
	fmt.Println(string(b))
}
