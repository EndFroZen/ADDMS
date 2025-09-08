package controllerGet

import (
	"archive/zip"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"server/config"
	"server/service"

	"github.com/gofiber/fiber/v2"
)

func DownLoadFile(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(float64)
	newUserID := int(userID)
	dataUser := service.LoadUserDataByID(newUserID, config.DB)
	newfodler := c.Query("Path")
	folderPath := fmt.Sprintf(".%s/%s/%s",config.Mainfile(),dataUser.Folder,newfodler)
	fmt.Println(folderPath)
	if folderPath == "" {
		return c.Status(fiber.StatusBadRequest).SendString("Path parameter is required")
	}

	if _, err := os.Stat(folderPath); os.IsNotExist(err) {
		return c.Status(fiber.StatusNotFound).SendString("Folder not found")
	}

	zipFileName := filepath.Base(folderPath) + ".zip"
	tempZip, err := os.Create(zipFileName)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Cannot create zip file")
	}
	defer tempZip.Close()
	defer os.Remove(zipFileName) // ลบไฟล์ zip หลังส่ง

	zipWriter := zip.NewWriter(tempZip)
	defer zipWriter.Close()

	// ฟังก์ชันช่วยเพิ่มไฟล์ลง zip
	err = filepath.Walk(folderPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil // ข้ามโฟลเดอร์
		}

		relPath, err := filepath.Rel(folderPath, path) // path ใน zip
		if err != nil {
			return err
		}

		file, err := os.Open(path)
		if err != nil {
			return err
		}
		defer file.Close()

		wr, err := zipWriter.Create(relPath)
		if err != nil {
			return err
		}

		_, err = io.Copy(wr, file)
		return err
	})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error zipping folder")
	}

	zipWriter.Close()

	return c.Download(zipFileName, zipFileName)
}
