package main

import (
	"log"
	"shop-backend/api"
	"shop-backend/db"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Init()

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/products", api.GetProducts)
	r.GET("/products/:id", api.GetProductByID)
	// TODO r.POST("/checkout", api.CreateCheckout)
	// TODO r.POST("/stripe-webhook", api.HandleStripeWebhook)

	log.Println("Server running at http://localhost:8080")
	r.Run(":8080")
}
