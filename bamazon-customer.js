var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config()

// Connecteng to the database
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  start();

  function start() {
    // Displays a list of items for sell and their details.

    connection.query('SELECT * FROM Products', function (err, res) {
      if (err) throw err;


      console.log('----------------------------------------------------------------------------------------------------')
      console.log("-------------GREETINGS CUSTOMER!---------------------")
      console.log('----------------------------------------------------------------------------------------------------')

      for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_Name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------')

      }



    // Prompiting the user for input
      inquirer
        .prompt([{
            message: "Please select item id of the item you would like to buy: ",
            type: "input",
            name: "id",

          },
          {
            message: "Please enter the number of widgets you want: ",
            type: "input",
            name: "userOrderAmount",

          }
        ])
        .then(function (input) {
          connection.query("SELECT * FROM products WHERE ?", {
            id: input.id
          }, function (err, results) {
            if (err) throw err;
            if (results.length === 0) {
              console.log("We don't have that item please try again....");
              Start();
            } else {
              var product = results[0];
              if (input.userOrderAmount <= product.stock_quantity) {
                console.log("Order accepted!");

                var adjustStock = "UPDATE products SET stock_quantity = " + (product.stock_quantity - input.userOrderAmount) + ' WHERE id = ' + input.id;

                connection.query(adjustStock, function (err, results) {
                  if (err) throw err;
                  console.log("Your total is $" + product.price * input.userOrderAmount);
                  console.log(product.price);
                  inquirer
                    .prompt({
                      name: "again",
                      type: "list",
                      message: "Would you ike to buy another item?",
                      choices: ["yes", "no",]
                    })

                    .then(function(response){
                      console.log(response)
                      if(response.again === "yes"){
                        start();
                      }
                     else{
                       console.log("Thank you have a nice day");
                        connection.end()
                      }
                    
                    })
                })
              } else {
                console.log("Sorry we don't have that much, please try again...");
                start();
              }
            }
          })
        })
    })
  }

});