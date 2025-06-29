package service

import (
	"fmt"
	"os"
	"server/config"
	noti "server/log"
	"server/models"


	"gorm.io/gorm"
)

var notiFileDeleteWeb = "service@deleteWebsite"

func DeleteWebFuncService(deleteWeb *models.DeleteStruct, user *models.User, db *gorm.DB) error {
	//1. delete folder if succsesful go to step 2
	newPath := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, deleteWeb.Website)
	err := os.RemoveAll(newPath)
	if err != nil {
		noti.LogNotic(1, notiFileDeleteWeb, "DeleteWebFuncService.18", fmt.Sprintf("%s", err))
		return err
	}
	// 2. Delete domain record (ถ้ามี table domains แยก)
	domainID ,err:= LoadSingleDomain(deleteWeb.Website,db)
	if err != nil{
		noti.LogNotic(2, notiFileDeleteWeb, "DeleteWebFuncService.27", fmt.Sprintf("ลบ domain ไม่สำเร็จ: %s", err))
		return err
	}
	if err := db.Where("domain_name = ? AND id = ?", deleteWeb.Website,domainID.ID).Delete(&models.Domain{}).Error; err != nil {
		noti.LogNotic(2, notiFileDeleteWeb, "DeleteWebFuncService.31", fmt.Sprintf("ลบ domain ไม่สำเร็จ: %s", err))
		return err
	}

	// 3. Delete website record
	
	if err := db.Where("domain_id = ? AND user_id = ?", domainID.ID, user.ID).Delete(&models.Website{}).Error; err != nil {
		noti.LogNotic(2, notiFileDeleteWeb, "DeleteWebFuncService.38", fmt.Sprintf("ลบเว็บไซต์ไม่สำเร็จ: %s", err))
		return err
	}
	return nil
}
