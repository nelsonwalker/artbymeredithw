package db

import (
	"database/sql"
	"log"
	"os"
	"time"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Init() {
	dsn := os.Getenv("DB_DSN")
	var err error

	// Retry loop
	for i := 0; i < 10; i++ {
		DB, err = sql.Open("postgres", dsn)
		if err == nil && DB.Ping() == nil {
			log.Println("Connected to database.")
			return
		}

		log.Printf("DB connection failed. Retrying (%d/10)...\n", i+1)
		time.Sleep(2 * time.Second)
	}

	log.Fatal("Failed to connect to DB after retries:", err)
}
