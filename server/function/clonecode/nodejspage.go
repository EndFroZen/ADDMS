package clonecode

import (
	"fmt"
	"os/exec"
)

func NodejsExpress(nameServer string, clonecodepath string) {
	cmd := exec.Command("npm", "i", "express")
	cmd.Dir = clonecodepath
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(string(output))
	}
	addrpath := fmt.Sprintf("%s/serverexpress.js", clonecodepath)
	err = ServerExpress(addrpath)
	if err != nil {
		fmt.Println("erererre")
	}
}
