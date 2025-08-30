package service

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"regexp"
	"server/models"
	"syscall"
	"time"
)

// StartServerLogic รัน server ของผู้ใช้ผ่าน firejail แบบ background
func StartServerLogic(command string, user models.User, path string, port int) (int, models.Notifications, error) {
	// ตรวจ blacklist
	if CheckIsBlacklisted(command) {
		return 0, models.Notifications{
			Title:     "Run server",
			ColorCode: 1,
			Massage:   fmt.Sprintf("command is blacklisted: %s", command),
			Type: "Error",
		}, fmt.Errorf("command is blacklisted: %s", command)
	}

	// Path จริงในเซิร์ฟเวอร์
	basePath := os.Getenv("USER_Path")
	privateBasePath := os.Getenv("Private_Base_Path")
	newPath := fmt.Sprintf("%s/%s/%s", basePath, user.Folder, path)
	userPath := fmt.Sprintf("%s/%s", user.Folder, path)

	// firejail command
	cmd := exec.Command("/usr/bin/firejail", "--noprofile", "--private="+newPath, "bash", "-c", command)
	cmd.Dir = newPath
	cmd.SysProcAttr = &syscall.SysProcAttr{Setsid: true}

	var outBuf, errBuf bytes.Buffer
	cmd.Stdout = &outBuf
	cmd.Stderr = &errBuf

	if err := cmd.Start(); err != nil {
		return 0, models.Notifications{
			Title:     "Run server",
			Massage:   "failed to start server",
			ColorCode: 1,
			Type: "Error",
		}, fmt.Errorf("failed to start server: %w", err)
	}

	pid := cmd.Process.Pid
	messageCh := make(chan string)
	colorCode := make(chan int)
	NType := make(chan string)
	go func() {
		if WaitForPort(port, 5*time.Second) {
			messageCh <- fmt.Sprintf("running server successful in port : %d", port)
			colorCode <- 4
			NType<- "Run server"
			err := cmd.Wait()
			re := regexp.MustCompile(regexp.QuoteMeta(privateBasePath))
			safeErr := re.ReplaceAllString(errBuf.String(), userPath)

			if err != nil {
				messageCh <- fmt.Sprintf("process exited with error: %v", err)
				colorCode <- 1
				NType<- ""
			}

			if len(safeErr) > 0 {
				messageCh <- safeErr
				colorCode <- 1
				NType<- "Run serve"
			}
			return
		} else {
			if cmd.Process != nil {
				_ = cmd.Process.Kill()
				_ = cmd.Wait()
			}
			re := regexp.MustCompile(regexp.QuoteMeta(privateBasePath))
			safeErr := re.ReplaceAllString(errBuf.String(), userPath)

			if len(safeErr) > 0 {
				messageCh <- safeErr + fmt.Sprintf(" or server failed to start on port %d", port)
				colorCode <- 1
				NType<- "Run serve"
			} else {
				messageCh <- fmt.Sprintf("server failed to start on port %d", port)
				colorCode <- 1
				NType<- "Run serve"
			}
			return
		}
	}()

	message := <-messageCh
	finalcolor := <-colorCode
	return pid, models.Notifications{
		Title:     "Action",
		Massage:   message,
		ColorCode: finalcolor,
		Type: <-NType,
	}, nil
}
