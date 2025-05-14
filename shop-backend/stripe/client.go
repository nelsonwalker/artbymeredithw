package stripe

import (
	"os"

	stripe "github.com/stripe/stripe-go/v82"
)

func Init() {
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
}
