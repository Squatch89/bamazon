const mysql = require('mysql');
const inquirer = require('inquirer');

let total;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    showAll();
    
    
    // connection.end();
});

function showAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: $${res[i].price}`);
        }
    });
    makePurchase();
    
}

function makePurchase() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which product would you like to purchase? Please use the product ID",
            name: "product"
        },
        {
            type: "input",
            message: "How many would you like to purchase?",
            name: "amount"
        }
    ]).then(function (answer) {
        
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            
            answer.product = res[(answer.product - 1 )].product_name;
            console.log(answer.product);
            
            for (let i = 0; i < res.length; i++) {
                if (answer.product === res[i].product_name) {
                    //check to see if there is enough stock to fulfill order
                    
                    //if there is not enough display (Insufficient quantity!)
                    if (res[i].stock_quanity < answer.amount) {
                        console.log("Insufficient quantity!")
                    }
                    //if there is place the order and update the database
                    else if (answer.amount >= res[i].stock_quanity) {
                        console.log("can place order here");
                        //then display the total cost
                    }
                }
            }
            
        })
    });
}

function placeOrder(){

}

function displayTotal(quanity, price) {
    return total = quanity * price;
};







