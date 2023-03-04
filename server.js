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

// Function that queries the employees table (called in the switch case above based from user selection)
function addDepartment() {
    inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: 'What would you like to name the new department?'
        }
    ])
    .then(function(data) {
        const query = `INSERT INTO department (department_name) VALUES(?)`

        employeeDb.query(query, data.department_name, (error, results) => {
            if (error) {
                throw error
            } else {
                console.table(results)
                startTracker()
            }
        })
    })
}


// Calls function to start
startTracker()