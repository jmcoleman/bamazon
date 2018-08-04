///////////////////////////////////
// packages
///////////////////////////////////
var inquirer = require("inquirer");
var mysql = require("mysql");
var currencyFormatter = require('currency-formatter');
const cTable = require('console.table');

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
        // find out how many
        {
            name: "units",
            message: "How many units?"
        }
    ]).then(function(answers) {
        fulfillOrder(parseInt(answers.productid), parseInt(answers.units));
    });
}

function showItemsForSale () {
    // select all products for sale with inventory on hand
    connection.query("select item_id, product_name, price, stock_quantity from products where stock_quantity > 0",
        function(err, res) {
            if (err) throw err;
            console.table(res);

            // res.forEach((element, index) => {
            //     // console.log(`Current index: ${index}`);
            //     // console.log(element);
         
            //     console.log(
            //         " Item ID: " + element.item_id + "\n", 
            //         "Product Name: " + element.product_name + "\n", 
            //         "Price: " + currencyFormatter.format(element.price, { code: 'USD' }) + "\n",
            //         "Stock: " +  element.stock_quantity + "\n"
            //     );
            // });

            // console.log(
            //     "\n Item ID: " + res[0].item_id + "\n", 
            //     "Product Name: " + res[0].product_name + "\n", 
            //     "Price: " + currencyFormatter.format(res[0].price, { code: 'USD' }) + "\n"s                      
            // );

            askQuestion();
        });
};

function fulfillOrder(item, purchaseQty) {
    // console.log("in fulfill order");

    var query;

    ///////////////////
    // check stock
    ///////////////////
    query = connection.query("select stock_quantity from products where item_id = ?",
        item,
        function(err, res) {
            if (err) throw err;
            
            // console.log(res);
            // console.log("current stock quantity is: " + res[0].stock_quantity);
            // console.log("current purchase quantity is: " + purchaseQty);

            if (res[0].stock_quantity >= purchaseQty && purchaseQty > 0) {

                //////////////////////////
                // decrease inventory
                //////////////////////////
                query = connection.query("update products set stock_quantity = ? where item_id = ?",
                    [
                        res[0].stock_quantity - purchaseQty,
                        item
                    ],
                    function(err, res) {
                        if (err) throw err;
                        // console.log(res.affectedRows + " products updated!\n");
                    });
                
                // console.log(query.sql);
                showItemPrice(item,purchaseQty);

            } else {
                if (purchaseQty <= 0 || isNaN(purchaseQty)) {
                    console.log("\nInvalid quantity.\n");
                } else {
                    console.log("\nThere is not enough inventory to purchase this item.\n");
                }
            }
            showItemsForSale();
        });

    console.log(query.sql);
};

function showItemPrice(item, qty) {
    var salesAmount;

    //  show the customer the total cost of their purchase
    query = connection.query("select product_name, price from products where item_id = ?",
        [item],
        function(err, res) {
            if (err) throw err;
            salesAmount = res[0].price * qty;
            console.log(`\nTotal cost for ${qty} unit(s) of ${res[0].product_name}: ` + currencyFormatter.format(salesAmount, { code: 'USD' }) + "\n");
        });
    console.log(query.sql);

};
