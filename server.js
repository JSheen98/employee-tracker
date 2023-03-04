// Calls required dependencies
const mysql = require('mysql2')
const cTable = require('console.table');
const inquirer = require('inquirer')

// Connects with the mysql database created from schema and seed files
const employeeDb = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees_db'
    }
)

// Starting user prompt
function startTracker() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ]
        }
    ])
        // Function goes through and selects the function option based off the user selection
        .then(function selections(data) {
            switch (data.options) {

                case 'View All Departments':
                    viewDepartments()
                    break

                case 'View All Roles':
                    viewRoles()
                    break

                case 'View All Employees':
                    viewEmployees()
                    break

                case 'Add a Department':
                    addDepartment()
                    break

                case 'Add a Role':
                    addRole()
                    break

                case 'Add an Employee':
                    addEmployee()
                    break

                case 'Update an Employee Role':
                    updateEmployee()
                    break
            }
        })
}

// Function that queries the department table (called in the switch case above based from user selection)
function viewDepartments() {
    const query =
        'SELECT department.id AS id, department.department_name AS name FROM department'
    employeeDb.query(query, (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('')
            console.log('Viewing All Departments')
            console.log('')
            console.table(results)
            startTracker()
        }
    })
}

// Function that queries the roles table (called in the switch case above based from user selection)
function viewRoles() {
    const query =
        'SELECT employee_role.title AS title, employee_role.id AS id, department.department_name AS department, employee_role.salary AS salary FROM employee_role LEFT JOIN department ON department.id = employee_role.department_id'
    employeeDb.query(query, (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('')
            console.log('Viewing All Roles')
            console.log('')
            console.table(results)
            startTracker()
        }
    })
}

// Function that queries the employees table (called in the switch case above based from user selection)
function viewEmployees() {
    const query =
        'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, employee_role.title AS title, department.department_name AS department, employee_role.salary AS salary, CONCAT_WS(" ", manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN employee_role ON employee_role.id = employee.role_id LEFT JOIN department ON department.id = employee_role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id'

    employeeDb.query(query, (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('')
            console.log('Viewing All Employees')
            console.log('')
            console.table(results)
            startTracker()
        }
    })
}

// Function that prompts the user for department name, and takes that data and inserts into db query, and pushes it to the department table (called in the switch case above based from user selection)
function addDepartment() {
    inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: 'What would you like to name the new department?'
        }
    ])
        // Then function that queries and inserts the above user selection into the department table
        .then(function(data) {
            const query = `INSERT INTO department (department_name) VALUES(?)`

            employeeDb.query(query, data.department_name, (error, results) => {
                if (error) {
                    throw error
                } else {
                    console.log('')
                    console.log('Department Added to Database, Click "View All Departments" to view changes')
                    console.log('')
                    console.table(results)
                    startTracker()
                }
            })
        })
}

// Function that prompts the user for role name, and takes that data and inserts into db query, and pushes it to the role table (called in the switch case above based from user selection)
function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What would you like to name the new role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for the new role?'
        },
        {
            name: 'department',
            type: 'list',
            message: 'Choose the ID of the department to add to',
            choices: listDeptIds()
        }
    ])
        // Then function that queries and inserts the above user selection into the employee_role table
        .then(function(data) {
            const query = `INSERT INTO employee_role (title, salary, department_id) VALUES("${data.title}", "${data.salary}", ${data.department})`

            employeeDb.query(query, (error, results) => {
                if (error) {
                    throw error
                } else {
                    console.log('')
                    console.log('Role Added to Database, Click "View All Roles" to view changes')
                    console.log('')
                    console.table(results)
                    startTracker()
                }
            })
        })
}

// Function that queries the department table, loops through the ids, and puts them in an array that turns into user selection options in the inquirer prompt
function listDeptIds() {
    const deptIds = []
    employeeDb.query('SELECT * FROM department', (error, results) => {
        if (error) {
            throw error
        } else {
            for (let i = 0; i < results.length; i++) {
                deptIds.push(results[i].id)
            }
        }
    })
    return deptIds
}

// Function that prompts the user for employee name, and takes that data and inserts into db query, and pushes it to the employee table (called in the switch case above based from user selection)
function addEmployee() {
    inquirer.prompt([
        {
            name: 'fName',
            type: 'input',
            message: "What is the employee's first name?"
        },
        {
            name: 'lName',
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: 'role',
            type: 'list',
            message: 'Choose the ID of the role to add to',
            choices: listRoleIds()
        },
        {
            name: 'manager',
            type: 'list',
            message: "Choose the ID of the employee's manager",
            choices: listEmployeeIds()
        }

    ])
        // Then function that queries and inserts the above user selection into the employee table
        .then(function(data) {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${data.fName}", "${data.lName}", ${data.role}, ${data.manager})`

            employeeDb.query(query, (error, results) => {
                if (error) {
                    throw error
                } else {
                    console.log('')
                    console.log('Employee Added to Database, Click "View All Employees" to view changes')
                    console.log('')
                    console.table(results)
                    startTracker()
                }
            })
        })
}

// Function that queries the employee_role table, loops through the ids, and puts them in an array that turns into user selection options in the inquirer prompt
function listRoleIds() {
    const roleIds = []
    employeeDb.query('SELECT * FROM employee_role', (error, results) => {
        if (error) {
            throw error
        } else {
            for (let i = 0; i < results.length; i++) {
                roleIds.push(results[i].id)
            }
        }
    })
    return roleIds
}

// Function that queries the employee table, loops through the ids, and puts them in an array that turns into user selection options in the inquirer prompt
function listEmployeeIds() {
    const managerIds = []
    employeeDb.query('SELECT * FROM employee', (error, results) => {
        if (error) {
            throw error
        } else {
            for (let i = 0; i < results.length; i++) {
                managerIds.push(results[i].id)
            }
        }
    })
    return managerIds
}

function updateEmployee() {
    inquirer.prompt([
        {
            name: 'employee_id',
            type: 'choice',
            message: 'What is the ID of the employee you are updating?',
            choices: listEmployeeIds()
        },
        {
            name: 'role_id',
            type: 'choice',
            message: 'What is the ID for their new role?',
            choices: listEmployeeRoleIds()
        }
    ])
    
    .then(function(data) {
        const query = `UPDATE employee SET role_id = ${data.role_id} WHERE id = ${data.employee_id}`
        
        employeeDb.query(query, (error, results) => {
            if (error) {
                throw error
            } else {
                console.log('')
                console.log('Employee Updated, Click "View All Employees" to view changes')
                console.log('')
                console.table(results)
                startTracker()
            }
        })
    })
}

function listEmployeeRoleIds() {
    const employeeRoleIds = []
    employeeDb.query('SELECT * FROM employee', (error, results) => {
        if (error) {
            throw error
        } else {
            for (let i = 0; i < results.length; i++) {
                employeeRoleIds.push(results[i].role_id)
            }
        }
    })
    return employeeRoleIds
}

// Calls function to start
startTracker()