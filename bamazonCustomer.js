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
function showItemsForSale () {
    // select all products for sale with inventory on hand
    connection.query("select item_id, product_name, price, stock_quantity from products where stock_quantity >= 0",
        function(err, res) {
            if (err) throw err;

            // show products in a table within the console
            console.table(res);

            // ask what to purchase
            promptForOrder();
        });
};

var promptForOrder = function() {
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
        // process the order requested
        fulfillOrder(parseInt(answers.productid), parseInt(answers.units));
    });
}

function fulfillOrder(item, purchaseQty) {

    var query;

    ///////////////////
    // check stock
    ///////////////////
    query = connection.query("select stock_quantity from products where item_id = ?",
        item,
        function(err, res) {
            if (err) throw err;
            
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
                        // console.log(res.affectedRows + " products updated.\n");
                    });
                
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

    // console.log(query.sql);
};

function showItemPrice(item, qty) {
    var salesAmount;

    //  show the customer the total cost of their purchase
    query = connection.query("select product_name, price from products where item_id = ?",
        [item],
        function(err, res) {
            if (err) throw err;
            salesAmount = res[0].price * qty;
            console.log(`\nTotal cost for ${qty} unit(s) of ${res[0].product_name} = ` + currencyFormatter.format(salesAmount, { code: 'USD' }) + "\n");
        });

    // console.log(query.sql);

};
