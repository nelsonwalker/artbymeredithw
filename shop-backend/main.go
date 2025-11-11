package main

import (
	"log"
	"os"
	"shop-backend/api"
	"shop-backend/db"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v82"
)

func main() {
	db.Init()

	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

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
	r.POST("/create-payment-intent", api.CreatePaymentIntent)
	// TODO r.POST("/checkout", api.CreateCheckout)
	r.POST("/stripe-webhook", api.HandleStripeWebhook)

	log.Println("Server running at http://localhost:8080")
	r.Run(":8080")
}
