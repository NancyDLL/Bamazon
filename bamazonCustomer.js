//The inquirer module will be required to be able to ask questions.
var inquirer = require("inquirer");

//mySQL module will be required to be able to update the db of products.
var mysql = require("mysql");

//This module for the table method will be reqired so that the products from the db are displayed in table format
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Username
  user: "root",
  // Password
  password: "#fm2;6dy3R%]JU7d,x9t",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
	if (err) throw err;
	//console.log(connection);
 	// run the listProducts function after the connection is made to prompt the user
	listProducts();
});

//Function to list all Products
function listProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log(" ");
		console.log("                  THE SUPER QUEST ONLINE STORE");
		console.log("                 Below is our current inventory.");
		console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *");
		console.table(res);
		console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *");
		console.log(" ");
	//run the function for customer product selection, with all the products from the db.
	customerProdSelect(res);
	});
}

// Function for customer product selection
function customerProdSelect(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Enter the Item ID of the item you would like to purchase.",
        validate: function(val) {
          return !isNaN(val);
        }
      }
    ])
    .then(function(val) {
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);
      // If there is a product with the id the user chose, prompt the customer for a desired quantity
      if (product) {
        // Pass the chosen product to promptCustomerForQuantity
        customerQuantSelect(product);
      }
      else {
        // Otherwise let them know the item is not in the inventory, re-run listProducts
        console.log(" ");
        console.log(" ");
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("That item is not in the inventory, please make another selection.");
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log(" ");
        console.log(" ");
        listProducts();
      }
    });
}

// Function for customer quantity selection
function customerQuantSelect(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like?",
        validate: function(val) {
          return val > 0;
        }
      }
    ])
    .then(function(val) {
      // Check if the user wants to quit the program
      var quantity = parseInt(val.quantity);

      // If there isn't enough of the chosen product and quantity, let the user know and re-run listProducts
      if (quantity > product.stock_quantity) {
      	console.log(" ");
      	console.log(" ");
      	console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("Insufficient quantity in stock, please make another selection.");
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log(" ");
        console.log(" ");
        listProducts();
      }
      else {
        // Otherwise run makePurchase, give it the product information and desired quantity to purchase
        makePurchase(product, quantity);
      }
    });
}

// Purchase the desired quanity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run listProducts
		console.log(" ");
		console.log(" ");
		console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
		console.log("Thank you for your purchase of " + quantity + " " + product.product_name + "'s!");
		console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
		console.log(" ");
		console.log(" "); 
      process.exit();
    }
  );
}

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

