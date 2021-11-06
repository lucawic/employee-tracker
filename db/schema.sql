CREATE TABLE departments(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_roles(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9,2),
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES employee_roles(id),
  manager_id INTEGER,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);


