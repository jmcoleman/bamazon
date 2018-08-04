# Bamazon
Amazon-like storefront

Bamazon is an Amazon-like storefront that uses MySQL.  The app takes in orders from customers and depletes stock from the store's inventory based on the product and units purchased.

**Problem it solves:** \ 
Allows a user to select products from a database store and deplete the stock counts based on available inventory.\ \ 
**How solved:** \
The user is presented with a catalogue of products, prices and current inventory.  To choose a product, the application asks for a product id and quantity and then fulfills based on current inventory levels.  The total cost of the item selected is shown as part of order fulfillment.\ \ 
**Technical approach:** \
MySQL is used as the backend database along with node.  The following npm packages are used: MySQL, Inquirer, currency-formatter, and console.table npm.  Inquirer is used to prompt the user to answer 2 questions related to their order, the currency-formatter is used to format prices in US currency, and console.table is used to output the product list in an aligned table format.  

## Getting Started

After installing the prerequisites, clone the repository locally.  Open GitBash and run 
```
    node bamazonCustomer.js 
```
from the command prompt in the project directory.

**Customer View** \

Order 1 item, inventory decreases by 1.  Shows each step.
![alt text](https://github.com/jmcoleman/bamazon/blob/master/markdown_images/1_bamazon_customer.png "Step 1")
![alt text](https://github.com/jmcoleman/bamazon/blob/master/markdown_images/2_bamazon_customer.png "Step 2")
![alt text](https://github.com/jmcoleman/bamazon/blob/master/markdown_images/3_bamazon_customer.png "Step 3")
![alt text](https://github.com/jmcoleman/bamazon/blob/master/markdown_images/4_bamazon_customer.png "Step 4")

Order more than one quantity of an item with enough inventory, inventory decreases and order is fulfilled
![alt text](https://github.com/jmcoleman/bamazon/blob/master/markdown_images/5_bamazon_customer.png "Multiple quantity")

Order a quantity without enough inventory, receive message that inventory is insufficient
![alt text](https://github.com/jmcoleman/bamazon/blob/master/markdown_images/6_bamazon_customer.png "Insufficient Inventory")

Order with an invalid quantity entered and receive message
![alt text](https://github.com/jmcoleman/bamazon/blob/master/markdown_images/7_bamazon_customer.png "Invalid quantity")

Order a quantity that depletes all inventory to 0
![alt text](https://github.com/jmcoleman/bamazon/blob/master/markdown_images/8_bamazon_customer.png "Order all remaining units")

### Prerequisites

 MySQL, node and npm must be installed.

### Installing

Create a database in MySQL named 'bamazon' and a products table with data.

For example, the below script can be used to create the databse, table, and load with some mock data:
```
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

```
## Running tests

Testing was done against both valid and invalid input and quantity selections.

## Deployment

The is a command line project which cannot be hosted on github pages.  Run it from a command line such as GitBash.

## Built With

The following npm packages are used: MySQL, Inquirer, currency-formatter, and console.table

**Technologies**\
JavaScript, Node, MySQL

## Contributing

N/A

## Versioning

This is version 1.0

## Authors

* **Jenni** - Initial project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments


