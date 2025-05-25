package models

type SaveStruct struct {
	Domain_name         string `json:"domain_name"`
	Framework           string `json:"framework"`
	ProgrammingLanguage string `json:"programmingLanguage"`
	Is_verified         string  `json:"is_verified"`
	Ssl_enabled         string   `json:"ssl_enabled "`
}
