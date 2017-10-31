const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    inquirer.prompt([
        {
            type: list,
            choices: ["View Products", "View Low Inventory", "Add Inventory", "Add New Product"],
            message: "Please select an option",
            name: "choice"
        }
    ]).then(function (answer) {
        if (answer.choices === "View Products") {
            viewProducts();
        }
        else if (answer.choices === "View Low Inventory") {
            viewLowInventory();
        }
        else if (answer.choices === "Add Inventory") {
            addInventory();
        }
        else if (answer.choices === "Add New Product") {
            addNewProduct();
        }
    })
    
    // connection.end();
});

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: $${res[i].price}`);
        }
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products HAVING count(*) < 5 ")
}

function addInventory() {

}

function addNewProduct() {

}