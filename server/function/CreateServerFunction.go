package function

import "fmt"

func CreateServerFunction (nameServer string ,programinglangue string ,framwork string)error{
	fmt.Println(nameServer)
	switch programinglangue {
	case "nodejs":
		nodejs()
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
func nodejs(){
	fmt.Println("Nodejs")
}
func gofiber(){
	fmt.Println("Go fiber")
}
func php(){
	fmt.Println("PHP")
}
func htmlStatic(){
	fmt.Println("html Static")
}