package function

import (
	"fmt"
	"log"
	"os/exec"
	"server/function/clonecode"
)

func CreateServerFunction(nameServer string, programinglangue string, framwork string) error {
	fmt.Println(nameServer)
	fmt.Println(framwork)

	if framwork == "none" {
		return fmt.Errorf("plase choose framwork")
	}

	switch programinglangue {
	case "nodejs":
		nodejs(nameServer, framwork)
	case "golang":
		gofiber()
	case "php":
		php()
	case "htmlstatic":
		htmlStatic()
	default:
		return fmt.Errorf("unsupported programming language: %s", programinglangue)
	}
	return nil
}
func nodejs(nameserver string, framwork string) error {
	cmd := exec.Command("mkdir", nameserver)
	cmd.Dir = "../create/user1"
	err := cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
	cmd = exec.Command("npm", "i", "-y")
	pathdir := fmt.Sprintf("../create/user1/%s", nameserver)
	cmd.Dir = pathdir
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(string(output))
	}
	clonecodepath := fmt.Sprintf("../create/user1/%s", nameserver)
	if framwork == "express" {
		clonecode.NodejsExpress(nameserver, clonecodepath)
	} else if framwork == "nestjs" {
		return fmt.Errorf("plase choss framwork")
	} else if framwork == "nextjs" {
		return fmt.Errorf("plase choss framwork")
	}
	return nil
}
func gofiber() {
	fmt.Println("Go fiber")
}
func php() {
	fmt.Println("PHP")
}
func htmlStatic() {
	fmt.Println("html Static")
}
