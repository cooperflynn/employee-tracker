const mysql = require('mysql2');
const cTable = require('console.table');
const emoji = require('node-emoji');
const { firstQuestion, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateRoleQuestions, viewByManagerQuestions, viewByDepartmentQuestions, deleteEmployeeQuestions } = require ('./inquirerFunctions');
const connection = mysql.createConnection({
    user: 'root',  //'dbuser'
    password: 'bluesky55!', //'dbpass'
    database: 'mydb', //'userdb'
    port: '/tmp/mysql.sock'
});

function allEmployeeQuery() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, department.title AS department, roles.title, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
        FROM employee
        LEFT JOIN roles ON employee.role_id=roles.id 
        LEFT JOIN department ON roles.department_id=department.id
        LEFT JOIN employee mgr ON employee.manager_id=mgr.id;`,
        function(err, res) {
            console.log(cTable.getTable(res));
            if (err) throw err;
        });
};

function allDepartmentQuery() {
    connection.query('SELECT * FROM department', function (err, res) {
        console.log(cTable.getTable(res));
        if(err) throw err;
    })
};

function allRoleQuery() {
    connection.query(`SELECT roles.id, roles.title, roles.salary, department.title AS department
    FROM roles
    LEFT JOIN department
    ON roles.department_id = department.id`,
    function (err, res) {
        console.log(cTable.getTable(res));
        if(err) throw err;
    })
};

function addDepartment() {
    addDepartmentQuestions()
    .then(answer => {
            connection.query(`INSERT INTO department (title)
            VALUES 
            ('${answer.department}')`, function(err, res) {
                if (err) throw err;
                console.log('Successfully added new department!' + emoji.get('smile'));
        });
    }).catch(err => {
        if(err) throw err;
    });
};

function addRole() {
    addRoleQuestions()
    .then(answers => {
        connection.query(`INSERT INTO roles (title, salary, department_id)
        VALUES
        ('${answers.title}', '${answers.salary}', '${answers.department}')`, function(err, res) {
            if (err) throw err;
            console.log('Role added successfuly!'  + emoji.get('smile'));
        });
    }).catch(err => {
        if(err) throw err;
    });
};

function addEmployee() {
    addEmployeeQuestions()
    .then(answers => {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
        ('${answers.firstName}', '${answers.lastName}', ${answers.role}, ${answers.manager})`, function(err, res) {
            if (err) throw err;
            console.log('Employee added!'  + emoji.get('smile'));
        });  
    }).catch(err => {
        if (err) throw err;
    })
}

function updateEmployeeRole() {
    updateRoleQuestions()
    .then(answers => {
        connection.query(`UPDATE employee
        SET
        role_id = ${answers.role}
        WHERE id = ${answers.id}`, function(err, res) {
            if (err) throw err;
            console.log('Updated!'  + emoji.get('smile'));
        });
    }).catch(err => {
        if (err) throw err;
    })
};

function viewEmployeesByManager() {
    viewByManagerQuestions()
    .then(answer => {
        connection.query(`SELECT * FROM employee WHERE manager_id = ${answer.id}`, function(err,res) {
            if(err) throw err;
            console.log(cTable.getTable(res));
        })
    }).catch(err => {
        if(err) throw err;
    })
};

function viewEmployeesByDepartment() {
    viewByDepartmentQuestions()
    .then(answer => {
        connection.query(`SELECT * FROM employee
        LEFT JOIN roles
        ON employee.role_id = roles.id
        LEFT JOIN department
        ON roles.department_id = department.id
        WHERE department_id = ${answer.id}`, function(err, res) {
            if(err) throw err;
            console.log(cTable.getTable(res));
        });
    }).catch(err => {if (err) throw err});
}

function deleteEmployee() {
    deleteEmployeeQuestions().then(answer => {
        connection.query(`DELETE FROM employee WHERE id = ${answer.id}`, function(err, ans) {
            if(err) throw err;
            console.log('Successfully deleted' + emoji.get('smile'));
        });
    });
}

module.exports = {
    allEmployeeQuery,
    allDepartmentQuery,
    allRoleQuery,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteEmployee
};
