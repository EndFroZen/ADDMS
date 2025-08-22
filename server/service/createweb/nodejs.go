package service_create

import (
	"fmt"
	"os/exec"
	"path/filepath"
	"server/config"
	noti "server/log"
	"server/models"
)

var nofiFilenodejs string = "service/create@nodejs"

func CreateNodeJS(website *models.SaveStruct, user *models.User, port int) error {
	//check flamework
	switch website.Framework {
	case "express":
		return createExpress(website, user, port)
	case "nextjs":
		return createNextjs(website, user, port)
	case "koa":
		return createKoa(website, user, port)
	case "fastify":
		return createFastify(website, user, port)
	}

	return nil
}

// func createNextjs(website *models.SaveStruct, user *models.User, port int) error {
// 	// 1. สร้าง path ปลายทาง
// 	targetDir := filepath.Join(".", config.Mainfile(), user.Folder, website.Domain_name)

// 	// ถ้าโฟลเดอร์ปลายทางมีอยู่แล้ว → ลบทิ้ง
// 	if _, err := os.Stat(targetDir); err == nil {
// 		if err := os.RemoveAll(targetDir); err != nil {
// 			noti.LogNotic(1, "service@createNextjs", "RemoveOldDir", fmt.Sprintf("Failed to remove old directory: %v", err))
// 			return err
// 		}
// 	}

// 	// 2. คัดลอก template
// 	templatePath := "/home/chanachol-lamdab/Documents/workspace/code/Project/ADDMS/ADDMS_backend/server/copyfile/addms_resource_nextjs"
// 	err := copyFolder(templatePath, targetDir)
// 	if err != nil {
// 		noti.LogNotic(1, "service@createNextjs", "CopyTemplate", fmt.Sprintf("Failed to copy template: %v", err))
// 		return err
// 	}

// 	// 3. รัน `npm install`
// 	cmd := exec.Command("npm", "install")
// 	cmd.Dir = targetDir

// 	var out bytes.Buffer
// 	cmd.Stdout = &out
// 	cmd.Stderr = &out

// 	if err := cmd.Run(); err != nil {
// 		noti.LogNotic(1, "service@createNextjs", "NpmInstall", fmt.Sprintf("npm install failed: %v\noutput: %s", err, out.String()))
// 		return err
// 	}
// 	err = CreateConfigPort(filepath.Join(targetDir, "config.json"), port)
// 	if err != nil {
// 		return err
// 	}
// 	// err = SavenameNewpacket(website, user)
// 	// if err != nil {
// 	// 	return err
// 	// }

// 	fmt.Println("✅ createNextjs: Website created successfully at", targetDir)
// 	return nil
// }
// func copyFolder(src string, dst string) error {
// 	return filepath.WalkDir(src, func(path string, d os.DirEntry, err error) error {
// 		if err != nil {
// 			return err
// 		}

// 		relPath, err := filepath.Rel(src, path)
// 		if err != nil {
// 			return err
// 		}

// 		destPath := filepath.Join(dst, relPath)

// 		if d.IsDir() {
// 			return os.MkdirAll(destPath, 0755)
// 		}

// 		// copy file
// 		return copyFile(path, destPath)
// 	})
// }

// func copyFile(srcFile, destFile string) error {
// 	src, err := os.Open(srcFile)
// 	if err != nil {
// 		return err
// 	}
// 	defer src.Close()

// 	dest, err := os.Create(destFile)
// 	if err != nil {
// 		return err
// 	}
// 	defer dest.Close()

// 	_, err = io.Copy(dest, src)
// 	return err
// }

func createNextjs(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_nextjs"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createNexjs.32", fmt.Sprint(err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("npm", "i")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createNexjs.44", "can't init npm")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		noti.LogNotic(1, nofiFile, "createNextjs.32", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}
	err = SavenameNewpacket(website,user)
	if err != nil{
		return  err
	}
	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil
}

func createExpress(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_express"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFile, "createExpress.54", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("npm", "i")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createExpress.35", "can't init npm")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		return err
	}
	err = SavenameNewpacket(website, user)
	if err != nil {
		return err
	}
	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil

}

func createKoa(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_koa"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFile, "createExpress.54", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("npm", "i")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createExpress.35", "can't init npm")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		return err
	}
	err = SavenameNewpacket(website, user)
	if err != nil {
		return err
	}
	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil

}

func createFastify(website *models.SaveStruct, user *models.User, port int) error {
	gitRepoURL := "https://github.com/EndFroZen/addms_resource_fastify"

	err := Gitclone(gitRepoURL, website, user)

	if err != nil {
		noti.LogNotic(1, nofiFile, "createExpress.54", fmt.Sprintf("failed to clone git repo: %v", err))
		return err
	}
	//npm i
	tarGetDIR := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, website.Domain_name)
	cmdInit := exec.Command("npm", "i")
	cmdInit.Dir = tarGetDIR
	if err := cmdInit.Run(); err != nil {
		noti.LogNotic(1, nofiFilenodejs, "createExpress.35", "can't init npm")
		return err
	}
	err = CreateConfigPort(filepath.Join(tarGetDIR, "config.json"), port)
	if err != nil {
		return err
	}
	err = SavenameNewpacket(website, user)
	if err != nil {
		return err
	}
	fmt.Printf("Git clone completed for website %s\n", website.Domain_name)
	return nil

}
