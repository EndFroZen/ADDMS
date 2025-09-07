package models

type EditFileRequest struct {
	ID      uint   `json:"id"`
	Path    string `json:"path"`    // ไฟล์ต้นทางที่จะแก้ไข
	Content string `json:"content"` // เนื้อหาที่ต้องการเขียนทับไฟล์
	NewPath string `json:"newpath"` // ถ้ามี เปลี่ยนชื่อ/ย้ายไฟล์
}
