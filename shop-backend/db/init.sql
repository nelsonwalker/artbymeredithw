CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price_cents INT NOT NULL,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    email TEXT NOT NULL,
    amount_paid_cents INT NOT NULL,
    stripe_payment_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price_cents, image_url) VALUES
  ('Ocean Study #1', 'A small original watercolor painting.', 4500, 'https://example.com/images/ocean1.jpg'),
  ('Sunset Giclée Print', 'Fine art print on archival paper.', 2500, 'https://example.com/images/sunset_print.jpg'),
  ('Bird Sketch', 'Black ink sketch on handmade paper.', 1500, 'https://example.com/images/bird_sketch.jpg'),
  ('Abstract #4', 'Colorful abstract acrylic on canvas.', 8000, 'https://example.com/images/abstract4.jpg'),
  ('Botanical Print Set', 'Set of 3 botanical prints.', 4000, 'https://example.com/images/botanical_set.jpg');

