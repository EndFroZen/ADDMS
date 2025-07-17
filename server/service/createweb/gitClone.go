package service_create

import (
	"fmt"
	"os/exec"
	"server/config"
	noti "server/log"
	"server/models"
)

func Gitclone(link string, website *models.SaveStruct, user *models.User) error {
	// สร้าง path โฟลเดอร์เป้าหมายสำหรับโคลน repo
	targetPath := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)

	// สั่ง git clone แบบ depth 1 ให้ดึงล่าสุดอย่างเดียว
	cmd := exec.Command("git", "clone", "--depth", "1", link, targetPath)

	// รันคำสั่งและจับผลลัพธ์
	output, err := cmd.CombinedOutput()
	if err != nil {
		noti.LogNotic(1, "service@Gitclone", "Gitclone.Exec", fmt.Sprintf("Git clone failed: %v, output: %s", err, string(output)))
		return err
	}

	// ลบ .git folder เพื่อไม่ให้เป็น repo git จริง (optional)
	gitFolderPath := targetPath + "/.git"
	err = exec.Command("rm", "-rf", gitFolderPath).Run()
	if err != nil {
		noti.LogNotic(2, "service@Gitclone", "Gitclone.RemoveGit", fmt.Sprintf("Failed to remove .git folder: %v", err))
		// ไม่ return err เพราะไม่ใช่เรื่องใหญ่
	}

	return nil
}
