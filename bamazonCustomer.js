//The inquirer module will be required to be able to ask questions.
var inquirer = require("inquirer");

//mySQL will be required to be able to update the db of products.
var mysql = require("mysql");

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
	//if (err) throw err;
	console.log(connection);
  
  // run the start function after the connection is made to prompt the user
  //listProducts();
});