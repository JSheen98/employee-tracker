# Employee Tracker

## ✏️ Description:

With this project, I wanted to created a command line application that the CEO, management, or other data entry jobs could use for keeping track of their employees and their roles. This application allows the user to add employees, departments, and new roles. The user can also view these tables at any time using 'View All Departments', 'View All Roles', 'View All Employees'. The user also has the ability to update an employee role. This app will save the user a lot of time as all the information is in one place, and it should make data entry a breeze!



## 📜 License:

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See LICENSE in the repo for more information.


## User Story

* AS A business owner
* I WANT to b e able to view and manage the departments, roles, and employees in my company
* SO THAT I can organize and plan my business 


## Acceptance Criteria

* GIVEN a command-line application that accepts user input
* WHEN I start the application
* THEN I am presented with the folowing options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all deparments
* THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
* THEN I am presented with the job title, role id, the department that role belonds to, and the salary for that role
* WHEN I choose to view all employees
* THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
* THEN I enter the name of the department and that department is added to the database
* WHEN I choose to add a role
* THEN I am prompted to enter the name, salary and department for the role and that role is added to the database
* WHEN I choose to add an employee
* THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
* THEN I am prompted to select an employee to update and their new role and this information is updated in the database


## 🖥️ Technologies Used

* Node.js (npm Inquirer, console.table)
* JavaScript
* MySQL


## ⚙️ Installation
1. Right click the 'server.js' file, click 'Open in integrated terminal'
2. run 'npm init -y' in the terminal
3. run 'npm i' in the terminal
4. run 'npm i inquirer@8.2.4' in the terminal
5. run 'npm i mysql2' in the terminal
6. run 'npm i console.table' in the terminal


## ✍️ Usage

1. Run 'mysql -u root -p' on the db file, then enter your password
2. Once the MySQL monitor is running, run 'SOURCE schema.sql;' in the terminal
3. Then run ' SOURCE seeds.sql;' in the terminal to seed the database tables with data
4. Then type 'quit' in the MySQL terminal
5. Type in 'cd ..' to change directory out of the db folder
6. Then type in 'node server.js' to start the command line database application


## 📸 Assets

The following video contains a sample walkthrough of this project's functionality and tests:

https://drive.google.com/file/d/1r3RXF_OR4rMHirPqTu3wCQq7Gx8UtuvX/view