package noti

import "fmt"

func LogNotic(numberError int,notiFile string,funcSting string,errString string){
	if(numberError == 1){
		fmt.Printf("[ 💥 ] [%s:%s] %s\n",notiFile,funcSting,errString)
	}else if(numberError == 2){
		fmt.Printf("[ 🗃️ ] [%s:%s] %s\n",notiFile,funcSting,errString)
	}else if(numberError == 3){
		fmt.Printf("[ ⚠️ ] [%s:%s] %s\n",notiFile,funcSting,errString)
	}
	
}