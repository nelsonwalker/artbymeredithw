package main

import (
	"log"
	"shop-backend/api"
	"shop-backend/db"

	"github.com/gin-gonic/gin"
)

func main() {
	db.Init()

	r := gin.Default()
	r.GET("/products", api.GetProducts)
	// TODO r.POST("/checkout", api.CreateCheckout)
	// TODO r.POST("/stripe-webhook", api.HandleStripeWebhook)

	log.Println("Server running at http://localhost:8080")
	r.Run(":8080")
}
