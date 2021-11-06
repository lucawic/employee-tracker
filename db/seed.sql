INSERT INTO departments(department_name)
VALUES
('Sales'),
('Finance'),
('Engineering'),
('Legal');

INSERT INTO employee_roles(title, salary, department_id)
VALUES
('Manager',65000.00,1),
('Accountant', 65000.00,2),
('Engineer', 105000.00,3),
('Lawyer',105000.00,4),
('Employee', 50000.00,1);

INSERT INTO employees(first_name, last_name,role_id)
VALUES
('John', 'Doe',1),
('Jane','Doe',2),
('Petr','Yan',3),
('Brandon','Moreno',4),
('Stipe','Miocic',5);

