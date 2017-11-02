const mysql = require('mysql');
const inquirer = require('inquirer');
let oldInv;

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
            type: "list",
            choices: ["View Products", "View Low Inventory", "Add Inventory", "Add New Product"],
            message: "Please select an option",
            name: "choice"
        }
    ]).then(function (answer) {
        if (answer.choice === "View Products") {
            viewProducts();
        }
        else if (answer.choice === "View Low Inventory") {
            viewLowInventory();
        }
        else if (answer.choice === "Add Inventory") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please select the item ID",
                    name: "id"
                },
                {
                    type: "input",
                    message: "How much new product would you like to add?",
                    name: "quantity"
                }
            ]).then(function (answer) {
                connection.query("SELECT * FROM products", function(err, res) {
                    if (err) throw err;
                    oldInv = res[(answer.id - 1)].stock_quanity;
                    addInventory((parseInt(oldInv) + parseInt(answer.quantity)), answer.id);
                });
                
            });
            
        }
        else if (answer.choice === "Add New Product") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the name of the new product?",
                    name: "name"
                },
                {
                    type: "input",
                    message: "What is the department of the new product?",
                    name: "department"
                },
                {
                    type: "input",
                    message: "How much will it cost per unit?",
                    name: "price"
                },
                {
                    type: "input",
                    message: "How much stock will we have?",
                    name: "stock"
                },
            ]).then(function (answer) {
                addNewProduct(answer.name, answer.department, answer.price, answer.stock);
            })
        }
        else {
            console.log("something went wrong");
            connection.end();
        }
    })
    
    // connection.end();
});

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: $${res[i].price} | Quantity: ${res[i].stock_quanity}`);
        }
        connection.end();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quanity < 5", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Quantity: ${res[i].stock_quanity}`);
        }
        connection.end();
    });
}

function addInventory(newInv, id) {
    connection.query(`UPDATE products SET ? WHERE ?`, [
        {
            stock_quanity: newInv
        },
        {
            item_id: id
        }], function (err, res) {
        if (err) throw err;
        console.log("Inventory has been added");
    });
    connection.end();
}

function addNewProduct(name, department, price, stock) {
    connection.query("INSERT INTO products SET ?", {
        product_name: name,
        department_name: department,
        price: price,
        stock_quanity: stock
    }, function (err, res) {
        if (err) throw err;
        console.log("Item added!");
    });
    connection.end();
}