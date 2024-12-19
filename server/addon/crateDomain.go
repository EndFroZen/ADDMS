package addon

import (
	"os/exec"

	"github.com/gofiber/fiber/v2"
)

func CreateDomain(c *fiber.Ctx) error {
	domain := c.FormValue("domain")

	cmd := exec.Command("cmd","/C"," if exist cd ../create/",domain,"echo exist alrady")
	ouput,err :=cmd.CombinedOutput()
	s := string(ouput)
	if err != nil{
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	if s =="exist alrady"{
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	cmd = exec.Command("cmd","/C","cd ../create && mkdir",domain)
	_,err =cmd.CombinedOutput()
	if err != nil{
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}
	return c.Redirect("http://localhost:3000/dashboard")
}
