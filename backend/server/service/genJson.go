package service

func Statustoken(status int, message string,token string) map[string]interface{} {
	return map[string]interface{}{
		"status":  status,
		"message": message,
		"token":token,
	}
}


func SimpleStatus(status int ,message string)map[string]interface{}{
	return map[string]interface{}{
		"status":  status,
		"message": message,
	}
}