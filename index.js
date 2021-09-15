const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const consoleTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');

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
    promptUser();
}));

const promptUser = () => {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            'View Employees',
            'View Roles',
            'View Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'Exit'
        ]
    })
    .then(function ({ task }) {
        switch (task) {
            case 'View Employees':
                queryTable('employee', 'SELECT * FROM employee');
                break;
            case 'View Departments':
                queryTable('department', `SELECT * FROM department`);
            case 'View Roles':
                queryTable("role", `SELECT * FROM role`);
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}

async function queryTable(title, sql) {
    const [rows, fields] = await connection.execute(sql);
    console.table(rows);
    promptUser();
};




connection.query('SELECT * FROM mytable', (err, result, feilds)=> {
    if(err) return console.error(err)

    console.log(result)

});

connection.end()