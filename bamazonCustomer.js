///////////////////////////////////
// packages
///////////////////////////////////
var inquirer = require("inquirer");
var mysql = require("mysql");
var currencyFormatter = require('currency-formatter');

///////////////////////////////////
// variables
///////////////////////////////////
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    user: "root",
    password: "root1234",
    database: "bamazon"
  });

////////////////
// main logic
////////////////
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    showItemsForSale();
  });

//////////////////////////////////////
// functions
//////////////////////////////////////
var askQuestion = function() {
    inquirer.prompt([
        // find out which product
        {
            name: "productid",
            message: "What is the id of the product to purchase?"
        },
        // find out what the quantity is
        {
            name: "units",
            message: "How many units?"
        }
    ]).then(function(answers) {
        placeOrder(answers.productid, answers.units);
        showItemsForSale();
    });
}

function showItemsForSale () {
    // select all products for sale with inventory on hand
    connection.query("select item_id, product_name, price from products where stock_quantity > 0",
        function(err, res) {
            if (err) throw err;
            // console.log(res);

            res.forEach((element, index) => {
                // console.log(`Current index: ${index}`);
                // console.log(element);
         
                console.log(
                    " Item ID: " + element.item_id + "\n", 
                    "Product Name: " + element.product_name + "\n", 
                    "Price: " + currencyFormatter.format(element.price, { code: 'USD' }) + "\n"
                );
            });

            // console.log(
            //     "\n Item ID: " + res[0].item_id + "\n", 
            //     "Product Name: " + res[0].product_name + "\n", 
            //     "Price: " + currencyFormatter.format(res[0].price, { code: 'USD' }) + "\n"s                      
            // );

            askQuestion();
        });
};

function placeOrder(prod, quantity) {
    console.log("in place order");

    // if (checkInventoryStock(prod, quantity)) {
    //     fullfillOrder();
    // } else {
    //     console.log("Not enough inventory on hand.");
    // }

    // notify user of purchase

};

function checkInventoryStock (product, qty) {
    var stockOnHand = false;

    
    // check if stock in on hand and whether there are enough units of it
    if (haveEnough) {
        stockOnHand = true;
    }
    return stockOnHand;

};

function fulfillOrder() {
    // decrease stock by updating the SQL database to reflect the remaining quantity

    //  show the customer the total cost of their purchase

};
