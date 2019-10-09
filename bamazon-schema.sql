DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(60) NOT NULL,
  department_name VARCHAR(60) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL
);

SELECT * FROM products ;

INSERT INTO products(product_name, department_name , price, stock_quantity)
VALUE("toilet_paper", "house", 2 , 10),
("tv_remote", "electronics", 10, 4),
("flat_screen_tv", "electronics", 600, 2),
("shirt", "clothing", 5, 30),
("blender"," kitchen", 20, 6),
("dog_collar", "pets", 9, 30), 
("stroller"," kids", 200, 5), 
("kayak", "outdoors", 600, 2),
("coffee_mug", "kitchen", 5, 50),
("compute_mouse", "electronics", 55, 10);
