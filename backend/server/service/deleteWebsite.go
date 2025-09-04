package service
import (
    "fmt"
    "os"
    "path/filepath"
    "server/config"
    noti "server/log"
    "server/models"

    "gorm.io/gorm"
)

var notiFileDeleteWeb = "service@deleteWebsite"

// moveToCustomTrash ย้ายไฟล์/โฟลเดอร์ไปยังถังขยะที่เรากำหนดเอง
func moveToCustomTrash(path string) error {
    trashDir := "./trash_bin"
    if _, err := os.Stat(trashDir); os.IsNotExist(err) {
        if err := os.MkdirAll(trashDir, 0755); err != nil {
            return fmt.Errorf("สร้างถังขยะไม่สำเร็จ: %w", err)
        }
    }

    // สร้าง path ใหม่ใน trash_bin (basename = ชื่อเดิม)
    newPath := filepath.Join(trashDir, filepath.Base(path))

    return os.Rename(path, newPath)
}

func DeleteWebFuncService(deleteWeb *models.DeleteStruct, user *models.User, db *gorm.DB) error {
    //1. delete folder if succsesful go to step 2
    newPath := fmt.Sprintf(".%s/%s/%s", config.Mainfile(), user.Folder, deleteWeb.Website)
    err := os.RemoveAll(newPath)
    if err != nil {
        // ถ้าลบไม่สำเร็จ → ย้ายไปถังขยะ
        noti.LogNotic(1, notiFileDeleteWeb, "DeleteWebFuncService.18", fmt.Sprintf("ลบไม่สำเร็จ: %s → ย้ายไป trash", err))
        if trashErr := moveToCustomTrash(newPath); trashErr != nil {
            noti.LogNotic(1, notiFileDeleteWeb, "DeleteWebFuncService.19", fmt.Sprintf("ย้ายไป trash ไม่สำเร็จ: %s", trashErr))
            return trashErr
        }
    }

    // 2. Delete domain record
    domainID, err := LoadSingleDomain(deleteWeb.Website, db)
    if err != nil {
        noti.LogNotic(2, notiFileDeleteWeb, "DeleteWebFuncService.27", fmt.Sprintf("ลบ domain ไม่สำเร็จ: %s", err))
        return err
    }
    if err := db.Where("domain_name = ? AND id = ?", deleteWeb.Website, domainID.ID).Delete(&models.Domain{}).Error; err != nil {
        noti.LogNotic(2, notiFileDeleteWeb, "DeleteWebFuncService.31", fmt.Sprintf("ลบ domain ไม่สำเร็จ: %s", err))
        return err
    }

    // 3. Delete website record
    dataWebsite, err := LoadUserSomeWebsiteByid(int(domainID.ID), config.DB)
    if err != nil {
        noti.LogNotic(2, notiFileDeleteWeb, "DeleteWebFuncService.555", fmt.Sprintf("ลบเว็บไซต์ไม่สำเร็จ: %s", err))
        return err
    }
    if err := db.Where("domain_id = ? AND user_id = ?", domainID.ID, user.ID).Delete(&models.Website{}).Error; err != nil {
        noti.LogNotic(2, notiFileDeleteWeb, "DeleteWebFuncService.38", fmt.Sprintf("ลบเว็บไซต์ไม่สำเร็จ: %s", err))
        return err
    }

    // 4. delete startserver record
    fmt.Println(dataWebsite.ID)
    if err := db.Where("website_id = ?", dataWebsite.ID).Delete(&models.StartServer{}).Error; err != nil {
        noti.LogNotic(2, notiFileDeleteWeb, "DeleteWebFuncService.44", fmt.Sprintf("ลบ startserver ไม่สำเร็จ: %s", err))
        return err
    }
    return nil
}
