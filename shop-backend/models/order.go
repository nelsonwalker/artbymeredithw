package models

type OrderItemRequest struct {
	ProductID int `json:"product_id"`
	Quantity  int `json:"quantity"`
}

type OrderRequest struct {
	Items            []OrderItemRequest `json:"items"`
	Email            string             `json:"email"`
	FirstName        string             `json:"first_name"`
	LastName         string             `json:"last_name"`
	Phone            string             `json:"phone"`
	DeliveryCountry  string             `json:"delivery_country"`
	DeliveryAddress  string             `json:"delivery_address"`
	DeliveryCity     string             `json:"delivery_city"`
	DeliveryState    string             `json:"delivery_state"`
	DeliveryPostcode string             `json:"delivery_postcode"`
	CardNumber       string             `json:"card_number"`
	ExpiryMonth      string             `json:"expiry_month"`
	ExpiryYear       string             `json:"expiry_year"`
	CVC              string             `json:"cvc"`
	CardholderName   string             `json:"cardholder_name"`
	BillingAddress   string             `json:"billing_address"`
}
