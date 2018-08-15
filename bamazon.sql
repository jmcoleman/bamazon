drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products(
	item_id INT NOT NULL AUTO_INCREMENT,		-- (unique id for each product)
	product_name	VARCHAR(100) NOT NULL, 		-- (Name of product)
	department_name	VARCHAR(100) NULL,
	price DECIMAL(13,4) NOT NULL,				-- (cost to customer)
	stock_quantity 	INT NOT NULL,				-- (how much of the product is available in stores)
	PRIMARY KEY (item_id)
);

-- remove all the data
truncate table products;

-- insert 10 rows
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("beans","grocery",1.00,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("hotdogs","grocery",2.00,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("glassware","housewares",8.00,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("pansies","gardening",5.00,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("plate","housewares",9.00,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("banana","grocery",1.25,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("shelves","housewares",17.00,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("apple","grocery",2.75,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("grapes","grocery",2.50,10);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("dvr","electronics",85.00,5);
INSERT INTO `bamazon`.`products` ( `product_name`,`department_name`,`price`,`stock_quantity`) VALUES ("pot","gardening",15.00,20);

-- select the data
select * from products;

-- aggregating money
SELECT
  ROUND(SUM(amount), 2) AS total_amount
FROM orders
WHERE created_at > '2012-01-01'

-- place order by
update products
set 

select stock_quantity from products where item_id = 4
select stock_quantity from products where item_id = 4