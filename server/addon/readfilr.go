package addon

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

type Domainfile struct {
	Filename string       `json:"filename"`
	IsDir    bool         `json:"isdir"`
	Children []Domainfile `json:"children"`
}

func newReadf(path string) (Domainfile, error) {
	fileInfo, err := os.Stat(path)
	if err != nil {
		return Domainfile{}, err
	}
	domainroot := Domainfile{
		Filename: fileInfo.Name(),
		IsDir:    fileInfo.IsDir(),
	}

	if domainroot.IsDir {
		entries, err := os.ReadDir(path)
		if err != nil {
			return Domainfile{}, err
		}

		for _, entry := range entries {
			childPath := filepath.Join(path, entry.Name())
			childDomain, err := newReadf(childPath)
			if err != nil {
				return Domainfile{}, err
			}
			domainroot.Children = append(domainroot.Children, childDomain)
		}
	}

	return domainroot, nil
}

func Readf(c *fiber.Ctx) error {
	data := c.Params("create")
	dir := fmt.Sprintf("../create/%s",data)
	rootreadf, err := newReadf(dir)
	if err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}
	return c.JSON(rootreadf.Children)
}
