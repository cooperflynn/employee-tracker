const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const { firstQuestion } = require('./utils/inquirerFunctions');
const { allEmployeeQuery, allDepartmentQuery, allRoleQuery, addDepartment, addRole, addEmployee, updateEmployeeRole, viewEmployeesByManager, viewEmployeesByDepartment, deleteEmployee } = require('./utils/queries');

// Create connection to database
const connection = mysql.createConnection ({
    user: 'root',  //'dbuser'
    password: 'bluesky55!', //'dbpass'
    database: 'mydb', //'userdb'
    port: '/tmp/mysql.sock'
});

const promptUser = () => {
    firstQuestion().then(answer => {
        switch (answer.choice) {
            case 'View all employees':
                allEmployeeQuery();
                break;
              case 'View all departments':
                allDepartmentQuery();
                break;
              case 'View all roles':
                allRoleQuery();
                break;
              case 'Add department':
                addDepartment();
                break;
              case 'Add role':
                addRole();
                break;
              case 'Add employee':
                addEmployee();
                break;
              case 'Update employee role':
                updateEmployeeRole();
                break;
              case 'View employees by manager':
                viewEmployeesByManager();
                break;
              case 'View employees by department':
                viewEmployeesByDepartment();
                break;
              case 'Delete employee':
                deleteEmployee();
                break;
        }
    }).catch(err => {if (err) throw err;});
}


promptUser();