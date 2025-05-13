package service_create

import (
	"fmt"
	"os"
	"server/config"
	"server/models"
	"server/service"

	"gorm.io/gorm"
)

func NodejsCreateWeb(userData *models.User ,websiteData *models.ModelWeb,db *gorm.DB) error {
	err := service.CreateWebFile(websiteData,config.DB,userData)
	if err != nil{
		return err
	}
	path := fmt.Sprintf("../corefolder/%s/%s",userData.Folder,websiteData.Name)
	err = os.MkdirAll(path,0755)
	if err != nil{
		fmt.Println("Error at NodejsCreateWeb func by create folder by name")
		return err
	}
	
	return nil
}