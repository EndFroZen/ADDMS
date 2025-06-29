package service_create

import (
	"fmt"
	"os"
	"server/config"
	noti "server/log"
	"server/models"
	"server/service/createweb/content"
)
const nofiFile string = "service/create@htmlstatic"
func HtmlStatic(website *models.SaveStruct, user *models.User) error {
	files := map[string]string{
		"index.html": content.Htmlsting(),
		"script.js":  content.Htmlscript(),
		"style.css":  content.HtmlCSS(),
	}
	for name, content := range files {
		fullPath := fmt.Sprintf(".%s/%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name, name)
		fmt.Println(fullPath)
		err := os.WriteFile(fullPath, []byte(content), 0644)
		if err != nil {
			noti.LogNotic(1,nofiFile,"HtmlStatic.23",fmt.Sprintf("cant' create file %s",name))
		}
	}
	return nil
}
