CREATE DATABASE IF NOT EXISTS flower_shop;
USE flower_shop;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS flowers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    stock INT,
    image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO flowers (name, description, price, stock, image) VALUES
    ('Red Rose Bouquet', 'Fresh red roses', 1500.00, 20, 'Flower1.jpg'),
    ('White Lily', 'Elegant white lilies', 1200.00, 15, 'Flower2.jpg'),
    ('Orchid Bloom', 'Exotic orchid arrangement', 2000.00, 10, 'Flower3.jpg'),
    ('Sunflower Bouquet', 'Bright sunflowers', 1800.00, 12, 'Flower5.1.jpg')
ON DUPLICATE KEY UPDATE name = VALUES(name);
