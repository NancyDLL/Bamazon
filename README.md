# Bamazon
KU Coding Bootcamp week 13 assignment utilizing JavaScript, Node, NPM, and MySQL.

## Description
In this assignment students were tasked to create an app that:
1. Presents a list of products to users.
1. Enables users to select a product and a quantity.
1. Updates the SQL database with the change in the inventory.

## Review of the App

### Set up the files and database on your local machine
1. Git clone this repository -> https://github.com/NancyDLL/Bamazon
1. Use the file "schema.sql" to create the table.
1. Use the file "products.sql" to poplate the database.
1. Modify the "bamazonCustomer.js file line 17 with the password of your localhost

### Set up the node modules and run the JavaScript file.
1. Install inquirer -> https://www.npmjs.com/package/inquirer
1. Install mysql -> https://www.npmjs.com/package/mysql
1. Install console.table -> https://www.npmjs.com/package/console.table
1. At the command line enter -> node bamazonCustomer.js

### Running the App
**The list of products is presented to the user with a prompt to select a product.**
![List of Products](/images/list.jpeg)

**The prompt to select a qantity is presented.**
![Quantity Prompt](/images/quantity.jpeg)

**Confirmation of the prchase is output.**
![Purchase Confirmation](/images/confirmation.jpeg)

### Incorrect Input Feedback
**Incorrect item ID and relist the products**
![Wrong ID](/images/wrongInventory.jpeg)

**Incorrect quantity and relist the products**
![Wrong Quantity](/images/wrongQuantity.jpeg)
