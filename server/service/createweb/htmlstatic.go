package service_create

import (
	"fmt"
	"log"
	"os"
	"server/config"
	"server/models"
	"server/service/createweb/content"
)


func HtmlStatic(website *models.SaveStruct ,user *models.User) {
	files := map[string]string{
		"index.html":content.Htmlsting(),
		"script.js":content.Htmlscript(),
		"style.css":content.HtmlCSS(),
	}
    for name , content := range files{
        fullPath := fmt.Sprintf(".%s/%s/%s/%s",config.Mainfile(),user.Folder,website.Domain_name,name)
        fmt.Println(fullPath)
		err := os.WriteFile(fullPath, []byte(content), 0644)
		if err != nil {
			log.Printf("Error writing %s: %v", fullPath, err)
		}
	}
    
	
}