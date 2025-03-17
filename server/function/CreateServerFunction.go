package function

import (
	"fmt"
	"log"
	"os/exec"
	"server/function/clonecode"
)

func CreateServerFunction(nameServer string, programinglangue string, framwork string) error {
	fmt.Println(nameServer)
	switch programinglangue {
	case "nodejs":
		nodejs(nameServer)
	case "golang":
		gofiber()
	case "php":
		php()
	case "htmlstatic":
		htmlStatic()
	default:
		return nil
	}
	return nil
}
func nodejs(nameserver string) {
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
	clonecodepath := fmt.Sprintf("../create/user1/%s/welcomepage.html", nameserver)
	clonecode.WelcomepageHTML(nameserver,clonecodepath)
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
