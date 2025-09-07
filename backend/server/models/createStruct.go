package models

type SaveStruct struct {
	Domain_name         string `json:"domain_name"`
	Framework           string `json:"framework"`
	ProgrammingLanguage string `json:"programming_language"`
	Is_verified         string `json:"is_verified"`
	Ssl_enabled         string `json:"ssl_enabled"`
	Github_repo         string `json:"github_repo"`
}
