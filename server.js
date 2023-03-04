const mysql = require('mysql2')
const cTable = require('console.table');
const inquirer = require('inquirer')

const employeeDb = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees_db'
    }
)

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
    .then(function selections(data) {
        switch (data.options) {
            
            case 'View All Departments':
                viewDepartments()
            break;


        }
    })
}

function viewDepartments() {
    const query = 'SELECT department.id AS id, department.department_name AS name FROM department'
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


startTracker()