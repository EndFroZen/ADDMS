package service

import (
	"fmt"
	"os"
	"syscall"
	"time"
)

func StopServerLogic(pid int) error {
	// ตรวจสอบก่อนว่า process ยังอยู่
	if err := syscall.Kill(pid, 0); err != nil {
		return fmt.Errorf("process %d not running: %v", pid, err)
	}

	proc, err := os.FindProcess(pid)
	if err != nil {
		return fmt.Errorf("failed to find process %d: %v", pid, err)
	}

	// ✅ Step 1: ส่ง SIGTERM
	if err := proc.Signal(syscall.SIGTERM); err != nil {
		return fmt.Errorf("failed to send SIGTERM to pid %d: %v", pid, err)
	}

	// ✅ Step 2: รอ process ปิดตัวเอง (graceful shutdown)
	const waitDuration = 3 * time.Second
	done := make(chan error, 1)

	go func() {
		for {
			err := syscall.Kill(pid, 0)
			if err != nil {
				// process ตายแล้ว
				done <- nil
				return
			}
			time.Sleep(200 * time.Millisecond)
		}
	}()

	select {
	case <-time.After(waitDuration):
		// ✅ Step 3: ถ้ายังไม่ตาย → Force Kill
		if err := proc.Kill(); err != nil {
			return fmt.Errorf("failed to force kill pid %d: %v", pid, err)
		}
		fmt.Printf("Process %d force killed\n", pid)
	case err := <-done:
		if err == nil {
			fmt.Printf("Process %d stopped gracefully\n", pid)
		} else {
			return fmt.Errorf("error while waiting for process %d: %v", pid, err)
		}
	}

	return nil
}
