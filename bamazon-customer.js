var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config()

var connection = mysql.createConnection({
  host: "127.0.0.1", 
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
});
start();

function start(){
  //prints the items for sale and their details
  connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
  
    console.log("-------------GREETINGS CUSTOMER!---------------------")
    console.log('----------------------------------------------------------------------------------------------------')
  
    for(var i = 0; i<res.length;i++){
      console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_Name+ " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
      console.log('--------------------------------------------------------------------------------------------------')
    }})};