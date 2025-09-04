package main

import (
	"server/config"
	"server/routes"
	"server/service"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // หรือกำหนดเฉพาะ domain เช่น "http://localhost:3000"
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))
	
	config.ConnectDatabase()
	service.AutoCreateFolderWeb(config.DB)
	service.ReloadRecodeIsOnline(config.DB)
	//to every 5 minute
	go func() {
		for {
			service.CreateResouse(config.DB)
			time.Sleep(15 * time.Minute)
		}
	}()
	routes.SetupRoutes(app)
	app.Listen("127.0.0.1:5661")
}

// func gensecretKey(db *gorm.DB) {
// 	var users []models.User
// 	result := db.Find(&users)
// 	if result.Error != nil {
// 		log.Fatal("failed to find records")
// 	}

// 	for i := range users {
// 		key := generateRandomKey(8) // 8 bytes = 16 hex characters
// 		users[i].SecretKey = key
// 		if err := db.Save(&users[i]).Error; err != nil {
// 			log.Printf("failed to update user %d: %v", users[i].ID, err)
// 		}
// 	}
// }
