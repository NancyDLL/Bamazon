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
	customerSelection();
	});
}

// Prompt customer for what they would like to purchase
function customerSelection() {
	inquirer.prompt([
      {
        type: "input",
        name: "item_id",
        message: "Enter the item ID of the product you would like to buy from the list above.",
      	validate: function (value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	},
	{
		type: "input",
		name: "quantity",
		message: "Enter the qantity of the item you would like to buy."
    }
    ]).then(function (select) {
    	var item_idSelect = select.item_id;
        var quantitySelect = select.quantity;
        purchase(item_idSelect, quantitySelect);
    });
}
