package clonecode

import (
	"fmt"
	"os"
)

func WelcomepageHTML(nameServer string, dirpath string) {
	welcompagecode := fmt.Sprintf(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>%s</title>
</head>
<body>
    <h1>Welcome %s.addms.click</h1>
    <p>server form ADDMS</p>
</body>
</html>`, nameServer, nameServer)
	err := os.WriteFile(dirpath, []byte(welcompagecode), 0644)
	if err != nil {
		fmt.Print("Error at create file :")
		fmt.Println(err)
	} else {
		fmt.Println("creat successfull")
	}
}
func ServerExpress(addrpath string) error {
	// cwd, err := os.Getwd()
	// if err != nil {
	// 	return err
	// }
	// fmt.Println("Current working directory:", cwd)
	serverexpresscode, err := os.ReadFile("./function/clonecode/template/express.txt")
	if err != nil {
		return err
	}
	err = os.WriteFile(addrpath,serverexpresscode,0644)
	if err != nil{
		return err
	}
	return nil
}
