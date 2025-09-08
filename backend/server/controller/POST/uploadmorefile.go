package controllerPost

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func UploadMoreFile(c *fiber.Ctx) error {
	// ดึง user
	userID := c.Locals("user_id").(float64)
	intUserID := int(userID)
	dataUser := service.LoadUserDataByID(intUserID, config.DB)

	// อ่าน form
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse form"})
	}

	files := form.File["files"]        // key สำหรับไฟล์
	fullpath := form.Value["fullpath"] // key สำหรับ path

	if len(files) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "no files uploaded"})
	}

	// สร้าง path ที่ต้องการ: always ภายใต้โฟลเดอร์ผู้ใช้
	subPath := ""
	if len(fullpath) > 0 && fullpath[0] != "" {
		subPath = fullpath[0]
	}
	saveDir := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), dataUser.Folder, subPath)
	os.MkdirAll(saveDir, os.ModePerm)

	uploadedFiles := []string{}
	for _, file := range files {
		savePath := filepath.Join(saveDir, file.Filename)
		originalName := file.Filename
		ext := filepath.Ext(originalName)
		nameOnly := strings.TrimSuffix(originalName, ext)
		counter := 1

		// ถ้าไฟล์มีอยู่แล้ว เพิ่มเลขต่อท้าย
		for {
			if _, err := os.Stat(savePath); os.IsNotExist(err) {
				break
			}
			newName := fmt.Sprintf("%s(%d)%s", nameOnly, counter, ext)
			savePath = filepath.Join(saveDir, newName)
			counter++
		}

		if err := c.SaveFile(file, savePath); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "cannot save file"})
		}
		uploadedFiles = append(uploadedFiles, savePath)
	}

	return c.JSON(fiber.Map{
		"message": "Upload successful",
		"files":   uploadedFiles,
	})
}
