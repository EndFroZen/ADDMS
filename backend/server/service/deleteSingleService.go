package service

import (
	"fmt"
	"os"
)


func DeleteFileByPath(path string) error {
	// ลองลบก่อน
	err := os.RemoveAll(path)
	if err != nil {
		// ถ้าลบไม่ได้ → ย้ายไปถังขยะ
		if trashErr := moveToCustomTrash(path); trashErr != nil {
			return fmt.Errorf("ลบไม่สำเร็จ (%v), และย้ายไป trash ไม่สำเร็จ: %w", err, trashErr)
		}
	}
	return nil
}
