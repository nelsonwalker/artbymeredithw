package api

import (
	"net/http"
	"shop-backend/db"
	"shop-backend/models"

	"github.com/gin-gonic/gin"
)

func GetProducts(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, name, description, price_cents, image_url FROM products")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var products []models.Product
	for rows.Next() {
		var p models.Product
		if err := rows.Scan(&p.ID, &p.Name, &p.Description, &p.PriceCents, &p.ImageURL); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		products = append(products, p)
	}

	c.JSON(http.StatusOK, products)
}
