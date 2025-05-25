package service

import (
	"fmt"
	"server/models"
	service_create "server/service/createweb"
)

func MakeWebsite(websiteData *models.SaveStruct, user *models.User) error {
	userData := user
	domainModel := models.Domain{
		Is_verified: websiteData.Is_verified,
		Ssl_enabled: websiteData.Ssl_enabled,
		Domain_name: websiteData.Domain_name,
	}

	fmt.Println(domainModel)
	if websiteData.ProgrammingLanguage == "nodejs" {
		err := service_create.CreateNodeJS(websiteData.Domain_name, userData)
		if err != nil {
			return err
		}
	}
	return nil
}
