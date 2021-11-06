const mysql = require('mysql2');
require('dotenv').config();
const inquirer = require('inquirer');
require('console.table');

const password = process.env.MYSQL_PW;

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'password',
    database: 'employees'
});

function viewAllEmployees() {
    const sql = `
    SELECT
    employees.id AS 'Employee ID',
    employees.first_name AS 'First Name',
    employees.last_name AS 'Last Name',
    employee_roles.title AS 'Title',
    employee_roles.salary AS 'Salary',
    departments.department_name AS 'Department',
    employees.manager_id AS 'Manager'

    FROM employees

    JOIN employee_roles ON employees.role_id = employee_roles.id

    JOIN departments ON employee_roles.department_id = department.id

    ORDER BY employee.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
            mainMenu();
        }
    });
}

function viewAllDepartments() {
    const sql = `
    SELECT
    departments.id AS 'ID',
    departments.department_name AS 'Department'

    FROM departments

    ORDER BY departments.id
    `;
    db.query(sql, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            console.table(results);
            mainMenu();
        }
    });
}
function viewAllRoles() {
    const sql = `
    SELECT
    employee_roles.id AS 'ID',
    employee_roles.title AS 'Title',
    employee_roles.salary AS 'Salary'

    FROM employee_roles

    ORDER BY employee_roles.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
            mainMenu();
        }
    });
}
function searchEmployee() {
    inquirer
    .prompt ([
        {
            type:'input',
            name: 'employeeID',
            message: 'Enter an employee id',
        },
    ])
    .then((answer) => {
        //const sql = `SELECT * FROM employees WHERE id =?`
        const sql = `
        SELECT 
        employees.id AS 'ID',
        employees.first_name AS 'First Name',
        employees.last_name AS 'Last Name',
        employee_roles.title AS 'Title',
        employee_roles.salary AS 'Salary',
        departments.department_name AS 'Department',
        employees.manager_id AS 'Manager'
        
        FROM employees
        JOIN employee_roles ON employees.role_id = employee_roles.id
        JOIN departments ON employee_roles.department_id = departments.id
        WHERE employees.id = ?
        `;
          console.log(answers.employeeID);
          db.query(sql, answers.employeeID, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
              mainMenu();
            }
          });
        });
    }
    
    function mainMenu() {
    
      inquirer
        .prompt({
          type: 'list',
          name: 'userSelect',
          message: 'Select and option from the menu!',
          choices: [
            '1.)View All Employees',
            '2.)View All Departments',
            '3.)View All Roles',
            '4.)Search employee by ID',
          ],
        })
        .then((answers) => {
          switch (answers.userSelect) {
            case '1.)View All Employees':
              viewAllEmployees();
              break;
            case '2.)View All Departments':
              viewAllDepartments();
              break;
            case '3.)View All Roles':
              viewAllRoles();
              break;
            case '4.)Search employee by ID':
              searchEmployee();
              break;
            default:
              break;
          }
        });
    }
    
    mainMenu();