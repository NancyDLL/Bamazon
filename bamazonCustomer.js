//The inquirer module will be required to be able to ask questions.
var inquirer = require("inquirer");

//mySQL will be required to be able to update the db of products.
var mysql = require("mysql");

//use this to display all the products in the db
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
	//run the function for customer selection, with all the products.
	customerProdSelect(res);
	});
}

// List products for the customer to select from
function customerProdSelect(inventory) {
  // Prompts user for what they would like to purchase
  inquirer.prompt([
      {
        type: "list",
        name: "productList",
        message: "Select from the list which product that you would like to buy.",
        choices: [res]
      }
    ]).then(function(val) {
      var product = checkInventory(choiceId, inventory);

      //Prompt the customer for a desired quantity
      if (product) {
        // Pass the chosen product to promptCustomerForQuantity
        promptCustomerForQuantity(product);
      }
      else {
        // Otherwise let them know the item is not in the inventory, re-run loadProducts
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}