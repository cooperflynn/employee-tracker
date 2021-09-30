const inquirer = require('inquirer');

function firstQuestion() {
    return new Promise((res, rej) => {
        inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select one:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role','Add employee', 'Update employee role', 'View employees by manager', 'View employees by department', 'Delete employee']
        }
    ]).then(answer => res(answer)).catch(err => rej(err));
    });
};

function addDepartmentQuestions() {
    return new Promise((res, rej) => {
        inquirer.prompt([
            {
            type: 'input',
            name: 'department',
            message: 'Enter new department name:',
            validate: answer => {
                if(answer){
                    return true;
                } else {
                    console.log('Enter department name!');
                    return false;
                }
            }
        }
    ]).then(answer => res(answer)).catch(err => rej(err));
    });
};

function addRoleQuestions() {
    return new Promise((res, rej) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter job title:',
                validate: answer => {
                    if(answer){
                        return true;
                    } else {
                        console.log('Enter job title!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary(ex: 30000.00)',
                validate: answer => {
                    if(answer){
                        return true;
                    } else {
                        console.log('Enter salary!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'department',
                message: 'Enter department id:',
                validate: answer => {
                    if(answer){
                        return true;
                    } else {
                        console.log('Enter department id!');
                        return false;
                    }
                }
            }
        ]).then(answers => res(answers)).catch(err => rej(err));
    });
};

function addEmployeeQuestions() {
    return new Promise((res, rej) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter first name:',
                validate: answer => {
                    if(answer){
                        return true;
                    } else {
                        console.log('Enter first name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter last name:',
                validate: answer => {
                    if(answer){
                        return true;
                    } else {
                        console.log('Enter last name!');
                        return false;
                    }
                }  
            },
            {
                type: 'input',
                name: 'role',
                message: 'Enter role id:',
                validate: answer => {
                    if(answer){
                        return true;
                    } else {
                        console.log('Enter role ID!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Enter managers id:',
                validate: answer => {
                    if(answer){
                        return true;
                    } else {
                        console.log('Enter managers ID!');
                        return false;
                    }
                }
            }
        ]).then(answers => res(answers)).catch(err => rej(err));
    });
};

function updateRoleQuestions() {
    return new Promise((res,rej) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter employee id:'
            },
            {
                type: 'input',
                name: 'role',
                message: 'Enter new role:'
            }
        ]).then(answers => res(answers)).catch(err => rej(err));
    });
};

function viewByManagerQuestions() {
    return new Promise((res, rej) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                nessage: 'Enter manager id:'
            }
        ]).then(answer => res(answer)).catch(err => rej(err));
    })
};

function viewByDepartmentQuestions() {
    return new Promise((res, rej) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter department id:'
            }
        ]).then(answer => res(answer)).catch(err => rej(err));
    })
};

function deleteEmployeeQuestions(arr) {
    return new Promise((res, rej) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter employee id:'
            }
        ]).then(answers => res(answers)).catch(err => rej(err));
    })
};

module.exports = {
    firstQuestion,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    updateRoleQuestions,
    viewByManagerQuestions,
    viewByDepartmentQuestions,
    deleteEmployeeQuestions
};