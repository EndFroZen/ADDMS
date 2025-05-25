package service

import (
	"fmt"
	"server/models"

	"gorm.io/gorm"
)

func CreateWebFile(webSiteData *models.ModelWeb, db *gorm.DB, userData *models.User) error {
	err := checkDomainName(webSiteData.Name,db)
	if err!= nil{
		return err
	}
	dataDomain := models.Domain{
		Domain_name: webSiteData.Name,
		Is_verified: "false", 
		Ssl_enabled: "false", 
	}
	
	
	if result := db.Create(&dataDomain); result.Error != nil {
		return result.Error
	}


	domain, err := getDomainByName(webSiteData.Name, db)
	if err != nil {
		return err
	}

	
	dataWebsite := models.Website{
		UserID:       userData.ID,
		StorageLimit: 10,
		Status:       "offline",
		Domain_id:    domain.ID,
	}
	if result := db.Create(&dataWebsite); result.Error != nil {
		return result.Error
	}

	return nil
}

func getDomainByName(name string, db *gorm.DB) (models.Domain, error) {
	var domain models.Domain
	if result := db.Where("domain_name = ?", name).First(&domain); result.Error != nil {
		return models.Domain{}, result.Error
	}
	return domain, nil
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
