package config

import (
	"fmt"
	"log"
	"os"
	"server/models"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	gormLogger "gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDatabase() {
	// โหลด .env
	if err := godotenv.Load(); err != nil {
		log.Fatal("❌ Error loading .env file")
	}

	// ดึง ENV
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASS")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbname := os.Getenv("DB_NAME")

	// สร้าง DSN
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		user, pass, host, port, dbname,
	)

	newLogger := gormLogger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		gormLogger.Config{
			SlowThreshold: time.Second,
			LogLevel:      gormLogger.Silent,
			Colorful:      true,
		},
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	DB = db

	// Auto migrate models
	if err := autoMigrateLoad(); err != nil {
		log.Fatal("Migration failed:", err)
	}

	log.Println("Connected to MariaDB and migrated.")
}

func autoMigrateLoad() error {
	return DB.AutoMigrate(&models.User{},
		&models.Website{},
		&models.Domain{},
		&models.Notifications{},
		&models.InstallPluginModel{},
		&models.StartServer{},
		&models.ResourceUsage{},
	)
}

//
