package service

import (
	"fmt"
	"math/rand"
	"os"
	"path/filepath"
	"server/config"
	noti "server/log"
	"server/models"

	service_create "server/service/createweb"
	"time"

	"gorm.io/gorm"
)

var notiFileMakeWebsite string = "service@makeWebsite"

func MakeWebsite(websiteData *models.SaveStruct, user *models.User) error {

	if websiteData.Domain_name == "" {
		return fmt.Errorf("domain name is required")
	}

	userData := user

	domainModel := models.Domain{
		Is_verified: websiteData.Is_verified,
		Ssl_enabled: websiteData.Ssl_enabled,
		Domain_name: websiteData.Domain_name,
	}

	//1.check domain name already exit
	if err := checkDomainName(websiteData.Domain_name, config.DB); err != nil {
		return err
	}
	//2.create folder
	if err := createFolder(websiteData, userData); err != nil {
		return err
	}
	port, err := GenerateUniquePort(config.DB)
	if err != nil {
		return err
	}
	// fmt.Println(websiteData.Github_repo)
	if websiteData.Github_repo != "null" && websiteData.Github_repo != "" {
		gitRepoURL := websiteData.Github_repo
		err := service_create.Gitclone(gitRepoURL, websiteData, userData)
		if err != nil {
			noti.LogNotic(1, notiFileMakeWebsite, "createExpress.54", fmt.Sprintf("failed to clone git repo: %v", err))
			return err
		}
		//npm i
		tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, websiteData.Domain_name)
		// cmdInit := exec.Command("npm", "i")
		// cmdInit.Dir = tarGetDIR
		// if err := cmdInit.Run(); err != nil {
		// 	noti.LogNotic(1, notiFileMakeWebsite, "creategitclone.35", "can't init npm")
		// 	return err
		// }
		err = service_create.CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
		if err != nil {
			return err
		}
		// fmt.Printf("Git clone completed for website %s\n", websiteData.Domain_name)

	} else {
		// fmt.Println("-------------------------------------------------------------------------")
		// fmt.Println("No Git repository provided, proceeding with project creation...")
		switch websiteData.ProgrammingLanguage {
		case "htmlstatic":
			{
				err := service_create.HtmlStatic(websiteData, userData)
				if err != nil {
					deleteIfErr(websiteData, userData)
					noti.LogNotic(1, notiFileMakeWebsite, "Makewebsite", fmt.Sprintf("%v", err))
					return err
				}
			}
		case "nodejs":
			{
				fmt.Println("Creating NodeJS project...")
				err := service_create.CreateNodeJS(websiteData, userData, port)
				if err != nil {
					noti.LogNotic(1, notiFileMakeWebsite, "Makewebsite", fmt.Sprintf("%v", err))
					deleteIfErr(websiteData, userData)
					fmt.Println("Error creating NodeJS project:", err)
					return err
				}
			}
		case "go":
			{
				fmt.Println("Creating Go project...")
				err := service_create.CreateGo(websiteData, userData, port)
				if err != nil {
					noti.LogNotic(1, notiFileMakeWebsite, "Makewebsite", fmt.Sprintf("%v", err))
					deleteIfErr(websiteData, userData)
					fmt.Println("Error creating Go project:", err)
					return err
				}
			}
		case "php":
			{
				fmt.Println("Creating PHP project...")
				err := service_create.CreatePHP(websiteData, userData, port)
				if err != nil {
					noti.LogNotic(1, notiFileMakeWebsite, "Makewebsite", fmt.Sprintf("%v", err))
					deleteIfErr(websiteData, userData)
					fmt.Println("Error creating Go project:", err)
					return err
				}
			}
		default:
			{
				noti.LogNotic(1, notiFileMakeWebsite, "Makewebsite", "can't create server")
				return fmt.Errorf("can't create server")
			}
		}
	}

	//4. genport
	var startServer models.StartServer
	Command, Path := GenCommndAndPath(websiteData.Framework, websiteData.Domain_name)
	startServer = models.StartServer{
		Command: Command,
		Path:    Path,
	}
	//5.save website and domain
	if err := saveWebDoamin(websiteData, domainModel, userData, config.DB, port, startServer); err != nil {
		return err
	}
	
	return nil
}
func GenCommndAndPath(framework string, domain_name string) (string, string) {
	switch framework {
	case "express":
		return "node server.js", domain_name
	case "nextjs":
		return "node dev.js", domain_name
	case "fastify":
		return "node dev.js", domain_name
	case "koa":
		return "node server.js", domain_name
	case "fiber":
		return "go run server.go", domain_name
	case "gin":
		return "go run server.go", domain_name
	case "revel":
		return "go run server.go", domain_name
	case "echo":
		return "go run server.go", domain_name
	case "laravel":
		return "php spark serve", domain_name
	case "codeigniter":
		return "php spark serve", domain_name
	case "slim":
		return "php spark serve", domain_name
	case "null":
		return "null", domain_name
	default:
		return "null", "null"
	}
}
func GenerateUniquePort(db *gorm.DB) (int, error) {

	const (
		minPort = 10000
		maxPort = 50000
	)
	rand.Seed(time.Now().UnixNano())
	maxAttempts := 100

	for i := 0; i < maxAttempts; i++ {
		port := rand.Intn(maxPort-minPort+1) + minPort

		var count int64
		err := db.Model(&models.Website{}).Where("port = ?", port).Count(&count).Error
		if err != nil {
			noti.LogNotic(1, notiFileMakeWebsite, "GenerateUniquePort", fmt.Sprintf("%v", err))
			return 0, err
		}

		if count == 0 {
			return port, nil
		}
	}

	return 0, fmt.Errorf("sum port  %d ", maxAttempts)
}

func saveWebDoamin(website *models.SaveStruct, domain models.Domain, user *models.User, db *gorm.DB, port int, startServer models.StartServer) error {
	//1.save domain name
	// fmt.Println("1.Saving domain:", domain.Domain_name)
	storageUsage, err := CheckStoragefolderSome(user.Folder, domain.Domain_name)
	// fmt.Println("Storage usage:", storageUsage)
	if err != nil {
		return fmt.Errorf("failed to check storage usage: %v", err)
	}
	result := db.Create(&domain)
	if result.Error != nil {
		noti.LogNotic(2, notiFileMakeWebsite, "saveWebDomain.58", "can't create recod")
		return result.Error
	}

	//save website
	// dataDoamin, err := LoadSingleDomain(domain.Domain_name, db)
	// if err != nil {
	// 	return err
	// }
	// fmt.Println("2.Saving website for domain:", domain.Domain_name)
	dbSaveWebsite := models.Website{
		UserID:              user.ID,
		StorageUsage:        storageUsage,
		Status:              "offline",
		Domain_id:           domain.ID,
		ProgrammingLanguage: website.ProgrammingLanguage,
		Framework:           website.Framework,
		Port:                port,
	}
	result = db.Create(&dbSaveWebsite)
	if result.Error != nil {
		noti.LogNotic(2, notiFileMakeWebsite, "saveWebDomain.76", "can't create recod")
		return result.Error
	}
	//save StartServer
	// fmt.Println("3.Saving start server for website ID:", dbSaveWebsite.ID)
	startServer = models.StartServer{
		Command:   startServer.Command,
		Path:      startServer.Path,
		WebsiteID: dbSaveWebsite.ID, // ได้ ID จากตอน insert website
	}
	result = db.Create(&startServer)
	if result.Error != nil {
		noti.LogNotic(2, notiFileMakeWebsite, "saveWebDomain.94", "can't create recod")
		return result.Error
	}
	return nil
}
func createFolder(websiteData *models.SaveStruct, userData *models.User) error {
	pathFolder := fmt.Sprintf("../corefolder/%s/%s", userData.Folder, websiteData.Domain_name)
	err := os.MkdirAll(pathFolder, 0755)
	fmt.Println(pathFolder)
	if err != nil {
		noti.LogNotic(2, notiFileMakeWebsite, "createFolder.58", "can't create recod")
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
	fmt.Println("deleting folder:", websiteData.Domain_name)
	pathFolder := fmt.Sprintf("../corefolder/%s/%s", userData.Folder, websiteData.Domain_name)
	err := os.RemoveAll(pathFolder)
	if err != nil {
		noti.LogNotic(1, notiFileMakeWebsite, "deleteIfErr.111", "can't delete file")
	}
	noti.LogNotic(3, notiFileMakeWebsite, "deleteIfErr.111", "Delete file sucsefull")
}
