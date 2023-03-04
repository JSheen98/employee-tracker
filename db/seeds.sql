-- Departments --
INSERT INTO department (id, department_name)
VALUES
    (01, 'Sales'),
    (02, 'Electric'),
    (03, 'Customer Service'),
    (04, 'Software Development'),
    (05, 'Software Testing');

-- Roles --
INSERT INTO employee_role (id, title, salary, department_id)
VALUES
    (001, 'Salesman', 50000, 01),
    (002, 'Sales Lead', 75000, 01),
    (003, 'Electrician', 80000, 02),
    (004, 'Journeyman Electrician', 100000, 02),
    (005, 'Master Electrician', 125000, 02),
    (006, 'Customer Service Rep', 28000, 03),
    (007, 'Customer Service Lead', 32000, 03),
    (008, 'Junior Developer', 80000, 04),
    (009, 'Senior Developer', 125000, 04 ),
    (010, 'Software Tester', 38000, 05),
    (011, 'Software Test Lead', 50000, 05);

-- Employees --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Inigo', 'Montoya', 002, null),
    ('Norman', 'Bates', 001, 1),
    ('Optimus', 'Prime', 001, 1),
    ('Anakin', 'Skywalker', 005, null),
    ('Luke', 'Skywalker', 003, 4),
    ('Ben', 'Kenobi', 004, 4),
    ('Han', 'Solo', 003, 4),
    ('Wednesday', 'Adams', 007, null),
    ('Samwise', 'Gamgee', 007, null),
    ('Frodo', 'Baggins', 006, 8),
    ('Donnie', 'Darko', 006, 8),
    ('Tony', 'Montana', 006, 9),
    ('Marge', 'Gunderson', 006, 9),
    ('Harry', 'Potter', 006, 9),
    ('Sara', 'Connor', 009, null),
    ('Katniss', 'Everdeen', 008, 15),
    ('Ferris', 'Bueller', 008, 15),
    ('Rocky', 'Balboa', 008, 15),
    ('Jules', 'Winnfield', 011, null),
    ('Jackson', 'Sheen', 010, 19);