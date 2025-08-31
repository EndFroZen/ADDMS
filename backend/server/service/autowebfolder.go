package service

import (
	"fmt"
	"log"
	"os"
	"server/models"

	"gorm.io/gorm"
)

func chekCoreFolder(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}
func AutoCreateFolderWeb(db *gorm.DB) {
	// load data
	loadDataUser := new([]models.User)
	result := db.Find(loadDataUser)
	if result.Error != nil {
		log.Fatal("error at autoCreateFolderWeb() by load data")
	}
	dataInUse := *loadDataUser
	// check folder "corefolder" in exiting
	path := "../corefolder"
	if !chekCoreFolder(path){
		err := os.MkdirAll(path,0755)
		if err != nil{
			log.Fatal("error in line 36 because create file is error")
		}
		fmt.Printf("create folder main successful\n")
	}
	// check folder user
	for i := range dataInUse{
		path := fmt.Sprintf("../corefolder/%s",dataInUse[i].Folder)
		if !chekCoreFolder(path){

			err := os.MkdirAll(path,0755)
			if err != nil{
				log.Fatal("error in line 36 because create file is error")
			}
			fmt.Printf("create folder %s successful\n",dataInUse[i].Folder)
		}
	}
}
