package service_create

import (
	"fmt"
	"io/ioutil"
	"server/config"
	"server/models"
	"strings"
)

func SavenameNewpacket(web *models.SaveStruct, user *models.User) error {
	files := []string{"package.json", "package-lock.json"}

	for _, file := range files {
		err := updateNameInFileRaw(web, user, file)
		if err != nil {
			return err
		}
	}
	return nil
}

func updateNameInFileRaw(web *models.SaveStruct, user *models.User, file string) error {
	newPath := fmt.Sprintf(".%s/%s/%s/%s", config.Mainfile(), user.Folder, web.Domain_name, file)

	data, err := ioutil.ReadFile(newPath)
	if err != nil {
		return err
	}

	contentStr := string(data)

	// หา key "name": "เดิม"
	key := `"name": "`
	startIdx := strings.Index(contentStr, key)
	if startIdx == -1 {
		return fmt.Errorf("ไม่พบ key 'name' ในไฟล์ %s", newPath)
	}

	// หาตำแหน่งจุดสิ้นสุดของค่าปัจจุบัน (เครื่องหมาย " ปิดท้าย)
	valueStart := startIdx + len(key)
	valueEnd := strings.Index(contentStr[valueStart:], `"`)
	if valueEnd == -1 {
		return fmt.Errorf("รูปแบบค่า 'name' ในไฟล์ %s ไม่ถูกต้อง", newPath)
	}
	valueEnd = valueStart + valueEnd

	// แทนที่ชื่อเดิมด้วยชื่อใหม่
	newContent := contentStr[:valueStart] + web.Domain_name + contentStr[valueEnd:]

	// เขียนไฟล์ทับ
	err = ioutil.WriteFile(newPath, []byte(newContent), 0644)
	if err != nil {
		return err
	}

	fmt.Printf("Updated name in %s (raw string replace)\n", newPath)
	return nil
}
