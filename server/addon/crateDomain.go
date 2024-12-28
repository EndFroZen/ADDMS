package addon

import (
	"fmt"
	"os/exec"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func checkFolder(domain string) error {
	fmt.Println(domain)
	cmd := exec.Command("cmd", "/C", "if exist ../create/user1/"+domain+" echo havefile")
	fmt.Println(cmd)
	output, err := cmd.CombinedOutput()
	fmt.Println(err)
	fmt.Println(string(output))
	if err != nil {
		
		return err
	}
	result := strings.TrimSpace(string(output))
	fmt.Println(result)
	if result == "havefile"{
		return err
	}
	return nil
}
func createServer(domain string,langue string) error{
	commander := "cd ../create/user1"
	commander = commander+" && mkdir "+domain
	commander = commander+" && cd "+domain
	if langue == "nodejs"{
		commander = commander+" && npm init -y"
	}else if langue == "golang"{
		commander = commander+" && go mod init server"
	}
	
	cmd := exec.Command("cmd","/C",commander)
	_,err := cmd.CombinedOutput()
	if err != nil{
		return err
	}
	return nil
}
func CreateDomain(c *fiber.Ctx) error {
	domain := c.FormValue("domain")
	langue := c.FormValue("langue")
	// express := c.FormValue("express")
	
	err := checkFolder(domain)
	if err != nil {
		return c.SendString(err.Error())
	}
	err = createServer(domain,langue)
	if err != nil {
		return c.SendString(err.Error())
	}
	return c.Redirect("http://localhost:3000/dashboard?TextNameUser=wdawdaw&PassWordUser=awd")

}
