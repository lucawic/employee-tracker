const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const password = process.env.MYSQL_PW;
const PORT = process.env.PORT || 3001;

app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employeesdb',
});

// Get all Employees and associated table information
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    });
  });
  //Get a single employee and associated table information
  app.get('/employees/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  });
  
app.get('/api/employees', (req, res) => {
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
                  JOIN departments ON employee_roles.department_id = departments.id
    `;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows,
      });
    });
  });
  
  // Not Found response for unmatched routes
  app.use((req, res) => {
    res.status(404).end();
  });
  
  // Start server after DB connection
  db.connect((err) => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });