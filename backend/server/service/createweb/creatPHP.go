package service_create

import (
	"fmt"
	"os/exec"
	"path/filepath"
	"server/config"
	noti "server/log"
	"server/models"
)

func CreatePHP(website *models.SaveStruct, user *models.User, port int) error {
	switch website.Framework {
	case "laravel":
		return createLaravel(website, user, port)
	case "codeigniter":
		return createCodeIgniter(website, user, port)
	case "slim":
		return createSlim(website, user, port)
	}
	return nil
}

func createLaravel(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_laravel"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create laravel", fmt.Sprint(err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("composer", "install")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create laravel 2", "can't init go mod")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		noti.LogNotic(1, nofiFile, "create laravel 3", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}
	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}

func createCodeIgniter(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_codeigniter"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create codeigniter", fmt.Sprint(err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("composer", "install")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create codeigniter 2", "can't init go mod")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		noti.LogNotic(1, nofiFile, "create codeigniter 3", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}

	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}


func createSlim(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_slim"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create slim", fmt.Sprint(err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("composer", "install")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create slim 2", "can't init go mod")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		noti.LogNotic(1, nofiFile, "create slim 3", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}
	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}
