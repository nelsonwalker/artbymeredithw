package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v82"
)

func HandleStripeWebhook(c *gin.Context) {
	event := stripe.Event{}

	if err := c.BindJSON(&event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse webhook body json"})
		return
	}

	// Unmarshal the event data into an appropriate struct depending on its Type
	switch event.Type {
	case "payment_intent.succeeded":
		var paymentIntent stripe.PaymentIntent
		err := json.Unmarshal(event.Data.Raw, &paymentIntent)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Error parsing webhook JSON: %v\n"})
			return
		}
		// Then define and call a func to handle the successful payment intent.
		handlePaymentIntentSucceeded(paymentIntent)
	default:
		fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
	}

	c.JSON(http.StatusOK, nil)
}

func handlePaymentIntentSucceeded(paymentIntent stripe.PaymentIntent) {
	// TODO: save in DB
}
