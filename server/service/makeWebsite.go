package service

import (
	"fmt"
	"os"
	"server/config"
	"server/models"
	service_create "server/service/createweb"

	"gorm.io/gorm"
)

func MakeWebsite(websiteData *models.SaveStruct, user *models.User) error {
	userData := user
	domainModel := models.Domain{
		Is_verified: websiteData.Is_verified,
		Ssl_enabled: websiteData.Ssl_enabled,
		Domain_name: websiteData.Domain_name,
	}
	
	//1.check domain name already exit
	if err := checkDomainName(websiteData.Domain_name,config.DB);err!=nil{
		return err
	}
	//2.create folder
	if err := createFolder(websiteData,userData);err!=nil{
		return err
	}
	

	//3.select programming langue
	if (websiteData.ProgrammingLanguage == "htmlstatic"){
		service_create.HtmlStatic(websiteData,userData)
	}else if(websiteData.ProgrammingLanguage == "nodejs"){

	}else if(websiteData.ProgrammingLanguage == "go"){

	}else if(websiteData.ProgrammingLanguage == "php"){

	}else{
		
	}
	//4.save website and domain
	if err := saveWebDoamin(domainModel,userData,config.DB); err != nil{
		return err
	}
	return nil
}

func saveWebDoamin(domain models.Domain,user *models.User,db *gorm.DB)error{
	//1.save domain name

	result := db.Create(&domain)
	if result.Error != nil{
		return result.Error
	}
	//2.save website
	dataDoamin,err := LoadSingleDomain(domain.Domain_name,db)
	if err != nil {
		return fmt.Errorf("not have dataDoamin")
	}
	dbSaveWebsite := models.Website{
		UserID: user.ID,
		StorageLimit: 5,
		Status: "offline",
		Domain_id: dataDoamin.ID,
		
	}
	result = db.Create(&dbSaveWebsite)
	if result.Error != nil{
		return result.Error
	}
	return nil
}
func createFolder(websiteData *models.SaveStruct ,userData *models.User)error{
	pathFolder := fmt.Sprintf("../corefolder/%s/%s",userData.Folder,websiteData.Domain_name)
	err := os.MkdirAll(pathFolder,0755)
	fmt.Println(pathFolder)
	if err != nil{
		return err
	}
	return nil
}
func checkDomainName(name string, db *gorm.DB) error {
	var domain models.Domain
	result := db.Where("domain_name = ?", name).First(&domain)
	if result.Error == nil {
		
		return fmt.Errorf("domain name '%s' already exists", name)
	}
	if result.Error != gorm.ErrRecordNotFound {
		
		return result.Error
	}
	// ไม่พบ domain → ผ่าน
	return nil
}
func deleteIfErr(websiteData *models.SaveStruct, userData *models.User) {
	pathFolder := fmt.Sprintf("../corefolder/%s/%s", userData.Folder, websiteData.Domain_name)
	err := os.RemoveAll(pathFolder)
	if err != nil {
		fmt.Printf("Failed to delete folder: %v\n", err)
	}
}
