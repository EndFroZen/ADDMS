package service

import (
	"fmt"
	"os/exec"
	"server/models"

	"gorm.io/gorm"
)

func SslCreate(db *gorm.DB, Domain models.Domain) error {
	if Domain.Ssl_enabled == "true" && Domain.Is_verified != "true" {
		// เรียก certbot แบบ non-interactive
		cmd := exec.Command(
			"sudo", "certbot", "--nginx",
			"-d", Domain.Domain_name,
			"--non-interactive", "--agree-tos",
		)

		output, err := cmd.CombinedOutput()
		if err != nil {
			return fmt.Errorf("failed to generate SSL: %v, output: %s", err, string(output))
		}

		fmt.Println("SSL certificate created successfully for domain:", Domain.Domain_name)

		// อัปเดตสถานะ verified ใน DB
		err = db.Model(&models.Domain{}).Where("id = ?", Domain.ID).Update("Is_verified", "true").Error
		if err != nil {
			return fmt.Errorf("failed to update domain verification: %v", err)
		}
		
		return nil

	}
	return nil

}
