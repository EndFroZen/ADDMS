package service_create

import (
	"fmt"
	"os"
	"os/exec"
	"server/config"
	noti "server/log"
	"server/models"
	"server/service/createweb/content"
)

var nofiFilenodejs string = "service/create@nodejs"

func CreateNodeJS(website *models.SaveStruct, user *models.User) error {
	//check flamework
	switch website.Framework {
	case "express":
		return createExpress(website, user)
	case "nextjs":
		return createNextjs(website, user)
	}

	return nil
}
func createNextjs(website *models.SaveStruct, user *models.User) error {
	// 1. สร้างโฟลเดอร์ปลายทาง
	newFolder := fmt.Sprintf("../%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	err := os.MkdirAll(newFolder, 0755)
	fmt.Println("Creating directory:", newFolder, "Error:", err)
	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createNextjs.24", "can't create folder")
		return err
	}

	// 2. ใช้ create-next-app สร้างโปรเจกต์
	cmdCreate := exec.Command("npx", "create-next-app@latest", ".", "--no-git", "--use-npm", "--force", "--yes")
	cmdCreate.Dir = newFolder
	output, err := cmdCreate.CombinedOutput()
	fmt.Println(string(output)) // << สำคัญมาก
	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createNextjs.30", fmt.Sprintf("failed to create nextjs app: %v", err))
		return err
	}

	// 3. เขียนหน้า index เพิ่มเติม (optional)
	indexPath := fmt.Sprintf("%s/app/page.tsx", newFolder)
	content := content.NextjsContentHtmle()
	err = os.WriteFile(indexPath, []byte(content), 0644)
	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createNextjs.40", fmt.Sprintf("can't write index: %v", err))
	}

	// 4. (Optional) สร้าง static ไฟล์ไว้ที่ public/
	// publicFiles := map[string]string{
	// 	"style.css": contentHtmlCSS(),
	// 	"script.js": contentHtmlscript(),
	// }
	// publicFolder := fmt.Sprintf("%s/public", newFolder)
	// os.MkdirAll(publicFolder, 0755)

	// for name, data := range publicFiles {
	// 	path := fmt.Sprintf("%s/%s", publicFolder, name)
	// 	os.WriteFile(path, []byte(data), 0644)
	// }

	return nil
}

func createExpress(website *models.SaveStruct, user *models.User) error {
	//1. create folder

	newFolder := fmt.Sprintf("../%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	err := os.MkdirAll(newFolder, 0755)
	fmt.Println(err)
	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createExpress.24", "can't create file")
		return err
	}
	//2. npm i
	cmdInit := exec.Command("npm", "init", "-y")
	cmdInit.Dir = newFolder
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createExpress.35", "can't init npm")
		return err
	}
	//3. npm i express
	cmdInstall := exec.Command("npm", "install", "express")
	cmdInstall.Dir = newFolder
	if err := cmdInstall.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createExpress.41", "can't install express")
		return err
	}
	//4. create index file for run
	files := map[string]string{
		"index.js": content.NodejsServer(),
	}
	for name, content := range files {
		fullPath := fmt.Sprintf(".%s/%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name, name)
		fmt.Println(fullPath)
		err := os.WriteFile(fullPath, []byte(content), 0755)
		if err != nil {
			noti.LogNotic(1, nofiFile, "createExpress.64", fmt.Sprintf("cant' create file %s : %s", name, err))

		}
	}
	//5. create sampling file
	newFolder = fmt.Sprintf(".%s/%s/%s/views", config.Mainfile(), user.Folder, website.Domain_name)
	err = os.MkdirAll(newFolder, 0755)
	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createExpress.24", fmt.Sprintf("can't create file : %s", err))
		return err
	}
	files = map[string]string{
		"index.html": content.Htmlsting(),
		"script.js":  content.Htmlscript(),
		"style.css":  content.HtmlCSS(),
	}
	for name, content := range files {
		fullPath := fmt.Sprintf(".%s/%s/%s/views/%s", config.Mainfile(), user.Folder, website.Domain_name, name)
		fmt.Println(fullPath)
		err := os.WriteFile(fullPath, []byte(content), 0755)
		if err != nil {
			noti.LogNotic(1, nofiFile, "createExpress.64", fmt.Sprintf("cant' create file %s : %s", name, err))

		}
	}
	return nil
}
