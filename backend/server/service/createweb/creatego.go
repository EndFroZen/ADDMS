package service_create

import (
	"fmt"
	"os/exec"
	"path/filepath"
	"server/config"
	noti "server/log"
	"server/models"
)

func CreateGo(website *models.SaveStruct, user *models.User, port int) error {
	switch website.Framework {
	case "gin":
		return createGin(website, user, port)
	case "fiber":
		return createFiber(website, user, port)
	case "echo":
		return createEcho(website, user, port)
	case "revel":
		return createReval(website, user, port)
	}
	return nil
}

func createGin(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_gin"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create gin", fmt.Sprint(err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("go", "mod", "tidy")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create gin 2", "can't init go mod")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		noti.LogNotic(1, nofiFile, "create gin 3", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}
	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}

func createFiber(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_gofiber"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create fiber", fmt.Sprint(err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("go", "mod", "tidy")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create fiber 2", "can't init go mod")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		noti.LogNotic(1, nofiFile, "create fiber 3", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}

	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}
func createEcho(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_echo"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create echo", fmt.Sprint(err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("go", "mod", "tidy")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create echo 2", "can't init go mod")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		noti.LogNotic(1, nofiFile, "create echo 3", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}
	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}
func createReval(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_revel"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create reval", fmt.Sprint(err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("go", "mod", "tidy")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "create reval 2", "can't init go mod")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		noti.LogNotic(1, nofiFile, "create reval 3", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}

	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}
