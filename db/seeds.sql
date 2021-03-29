CREATE database TEMPORARY
// Need to create a db for employee

CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE IF role (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary 
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
)
