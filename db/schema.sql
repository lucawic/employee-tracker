CREATE TABLE employee(
  id INTEGER PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  role_id FOREIGN KEY REFERENCES role(id)
  manager_id FOREIGN KEY REFERENCES employee(id)
);

CREATE TABLE role(
  id INTEGER PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id FORIGN KEY REFERENCES department(id)
);

CREATE TABLE department(
  id INTEGER PRIMARY KEY,
  name VARCHAR(30) NOT NULL
); 