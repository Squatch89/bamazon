const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    showAll();
    
    connection.end();
});

function showAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: $${res[i].price}`);
        }
    });
    
    inquirer.prompt([
        {
            type: "input",
            message: "Which product would you like to purchase? Please use the product ID",
            name: "product"
        },
        {
            type: "input",
            message: "How many would you like to purchase?",
            name: "ammount"
        }
    ]).then(function(answer) {
    
    });
}


//check to see if there is enough stock to fulfill order

//if there is place the order and update the database
//then display the total cost

//else if there is not enough display (Insufficient quantity!)


