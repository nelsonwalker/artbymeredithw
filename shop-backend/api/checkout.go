package api

import (
	"fmt"
	"net/http"
	"shop-backend/models"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v82"
	"github.com/stripe/stripe-go/v82/paymentintent"
)

func CreatePaymentIntent(c *gin.Context) {
	var req models.PaymentIntentRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(req.Amount)),
		Currency: stripe.String("AUD"),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}

	pi, err := paymentintent.New(params)
	if err != nil {
		// Try to safely cast a generic error to a stripe.Error so that we can get at
		// some additional Stripe-specific information about what went wrong.
		if stripeErr, ok := err.(*stripe.Error); ok {
			fmt.Printf("Other Stripe error occurred: %v\n", stripeErr.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": stripeErr.Error()})
		} else {
			fmt.Printf("Other error occurred: %v\n", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": stripeErr.Error()})
		}

		return
	}

	c.JSON(http.StatusOK, struct {
		ClientSecret string `json:"clientSecret"`
	}{
		ClientSecret: pi.ClientSecret,
	})
}
