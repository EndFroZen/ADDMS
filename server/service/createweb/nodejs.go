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
	if website.Framework == "express" {
		err := createExpress(website, user)
		return err
	}
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
		"index.js":content.NodejsServer(),
	}
	for name, content := range files {
		fullPath := fmt.Sprintf(".%s/%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name, name)
		fmt.Println(fullPath)
		err := os.WriteFile(fullPath, []byte(content), 0755)
		if err != nil {
			noti.LogNotic(1,nofiFile,"createExpress.64",fmt.Sprintf("cant' create file %s : %s",name,err))
			
		}
	}
	//5. create sampling file
	newFolder = fmt.Sprintf(".%s/%s/%s/views", config.Mainfile(), user.Folder, website.Domain_name)
	err = os.MkdirAll(newFolder, 0755)
	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createExpress.24", fmt.Sprintf("can't create file : %s",err))
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
			noti.LogNotic(1,nofiFile,"createExpress.64",fmt.Sprintf("cant' create file %s : %s",name,err))
			
		}
	}
	return nil
}
