delete FROM department;
INSERT INTO department (id,name) values (1,"Finance");
INSERT INTO department (id,name) values (2,"Sales");
INSERT INTO department (id,name) values (3,"Engineering");
INSERT INTO department (id,name) values (4,"Legal");

delete FROM role;
INSERT INTO role (id, title, salary, department_id) values (1,"Lead Engineer", 150000, 3);
INSERT INTO role (id, title, salary, department_id) values (2,"Software Engineer", 120000, 3);
INSERT INTO role (id, title, salary, department_id) values (3,"Sales Lead", 100000, 2);
INSERT INTO role (id, title, salary, department_id) values (4,"Salesperson", 80000, 2);
INSERT INTO role (id, title, salary, department_id) values (5,"Accountant", 125000, 1);
INSERT INTO role (id, title, salary, department_id) values (6,"Legal Team Lead", 250000, 4);
INSERT INTO role (id, title, salary, department_id) values (7,"Lawyer", 190000, 4);

delete FROM employee;
INSERT INTO employee (id, first_name, last_name, role_id) values (1,"Christian", "Allen", 7 );
INSERT INTO employee (id, first_name, last_name, role_id) values (2,"Stuart", "Malone", 6 );
INSERT INTO employee (id, first_name, last_name, role_id) values (3,"Hugo", "Jackson", 1 );
INSERT INTO employee (id, first_name, last_name, role_id) values (4,"Glenda", "Scott", 3 );
INSERT INTO employee (id, first_name, last_name, role_id) values (5,"Max", "Nunez", 5 );
INSERT INTO employee (id, first_name, last_name, role_id) values (6,"Sheila", "Gray", 4 );
INSERT INTO employee (id, first_name, last_name, role_id) values (7,"Angelica", "Hoffman", 2 );