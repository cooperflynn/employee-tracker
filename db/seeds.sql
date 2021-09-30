INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Legal'),
    ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
 ('Sales Lead', '100000.00', 1),
 ('Salesperson', '32000.00', 1),
 ('Legal Team Lead', '120000.00', 2),
 ('Lawyer', '100000.00', 2),
 ('Senior Engineer', '110000.00', 3),
 ('Junior Engineer', '90000.00', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bob', 'Roberts', 1, NULL),
    ('Dick', 'Richards', 2, 1),
    ('Chris', 'Topher', 3, NULL),
    ('Joe', 'Nathan', 4, 3),
    ('Sigmund', 'Freud', 5, NULL),
    ('Rand', 'Althor', 6, 5);