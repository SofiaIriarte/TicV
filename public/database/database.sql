-- Create the database
CREATE DATABASE ecommerce;

-- Use the database
USE ecommerce;

-- Create table for product categories
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Create table for products
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    image_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Create table for customers
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(10),
    country VARCHAR(255),
    products INT,
    orders INT,
    FOREIGN KEY (products) REFERENCES products(product_id)
    FOREIGN KEY (orders) REFERENCES orders(order_id)
);

-- Create table for orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer INT,
    items order_items NOT NULL,
    payment ENUM('Pending','Error','Payed') NOT NULL,
    address VARCHAR(255) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status ENUM('Pending', 'Shipped', 'Delivered') NOT NULL,
    FOREIGN KEY (customer) REFERENCES customers(customer_id)
);

-- Create table for order items
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order INT NOT NULL,
    product INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order) REFERENCES orders(order_id),
    FOREIGN KEY (product) REFERENCES products(product_id)
);