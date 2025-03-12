package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	runfile("server","3001")
	runfile("fonttester","3002")
}

func runfile(namefile string,port string) {
	if _, err := os.Stat(namefile); os.IsNotExist(err) {
		fmt.Println("filename", namefile)
		return
	}
	cmd := exec.Command("go", "run", ".")
	cmd.Dir = namefile

	err := cmd.Start()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("go runnig " + namefile+" and run on http://localhost:"+port)
}
