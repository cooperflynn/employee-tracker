const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

// Create connection to database
const connection = mysql.createConnection ({
    user: 'root',  //'dbuser'
    password: 'bluesky55!', //'dbpass'
    database: 'mydb', //'userdb'
    port: '/tmp/mysql.sock'
});

connection.connect((err => {
    if (err) throw err;
    console.log('Successfully connected to database!');
}))

connection.query('SELECT * FROM mytable', (err, result, feilds)=> {
    if(err) return console.error(err)

    console.log(result)

});

connection.end()