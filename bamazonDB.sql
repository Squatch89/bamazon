DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INTEGER(100) DEFAULT 0,
  stock_quanity INTEGER(100) DEFAULT 0,
  PRIMARY KEY (item_id)
);

