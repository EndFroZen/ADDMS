package service

import (
	"fmt"
	"os/exec"
	"syscall"

	"server/models"
)

func StartServerLogic(command string, user models.User, path string) error {
	// ตรวจ blacklist
	if CheckIsBlacklisted(command) {
		return fmt.Errorf("command is blacklisted: %s", command)
	}
	newPath := fmt.Sprintf("/home/chanachol-lamdab/Documents/workspace/code/Project/ADDMS/ADDMS_backend/corefolder/%s/%s", user.Folder, path)

	// รันผ่าน firejail
	cmd := exec.Command("/usr/bin/firejail", "--noprofile", "--private="+newPath, "bash", "-c", command)
	cmd.Dir = newPath

	// ให้รันเป็น background (ไม่หยุดเมื่อ Go process จบ)
	cmd.SysProcAttr = &syscall.SysProcAttr{Setsid: true}

	// ส่ง stdout/stderr ออกไปยัง console (หรือเก็บลงไฟล์ก็ได้)
	// cmd.Stdout = os.Stdout
	// cmd.Stderr = os.Stderr

	// เริ่มรัน (ไม่รอให้เสร็จ)
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to start server: %w", err)
	}

	fmt.Printf("Server for user %s started with PID %d inside firejail\n", user.Username, cmd.Process.Pid)
	return nil
}
