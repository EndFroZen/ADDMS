package service_create

import (
	"fmt"
	noti "server/log"
	"server/models"
)

const nofiFile string = "service/create@htmlstatic"

func HtmlStatic(website *models.SaveStruct, user *models.User) error {
	
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_html"

	err := Gitclone(gitRepoURL,website,user)

	if err != nil {
		noti.LogNotic(1, nofiFile, "HtmlStatic.Gitclone", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}

	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}
