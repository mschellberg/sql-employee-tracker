const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');


const PORT = process.env.PORT || 3003;
// create the connection to database

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0890016Mls!',
    database: 'db_employee'
  });
 
  connection.connect((err) => {
    if (err) throw err;
  });

function viewAllDepartments() {
    var query = "SELECT * FROM department";
      connection.query(query, function(err, res) {
          console.log(`ALL DEPARTMENTS`)
        res.forEach(department => {
            console.table(`ID: ${department.id} | Name: ${department.name}`)
        })
       mainMenu();
        });
    }

function viewAllRoles() {
    var query = 'SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id';
    connection.query(query, function(err, res) {
        console.log(`ALL ROLES`)
        res.forEach(role => {
            console.table(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department: ${role.name}`);
        })
        mainMenu();
    });  
}

function viewAllEmployees(){
const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department on role.department_id = department.id';
connection.query(query, function(err, res) {
    console.log(`ALL EMPLOYEES:`)
    res.forEach(employee => {
        console.table(`ID: ${employee.id} | First Name: ${employee.first_name} | Last Name: ${employee.last_name} | Role: ${employee.title} | Salary: ${employee.salary}` )
    })
    mainMenu();
});
}

// generates a new ID
function getId(idField, tableName) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT max(${idField}) as maxId FROM ${tableName}`,
function (err, results, fields) {
    if (err){
        reject(err);
    } else {
        resolve(results[0]['maxId'] + 1);
    }
}
        
    );
}
    );
}

function addDepartment() {
    getId("id", "department").then(id => {
    inquirer.prompt([
        {
        name: "department",
        type: "input",
        message: "What department would you like to add?"
        }
    ])
    
    .then(function(answer) {
        var query = `INSERT INTO department (id, name) VALUES (${id}, '${answer.department}')`;
        connection.query(query, function (err, res) {
            if (err) {
                console.log(err.message);
            }
            console.table(`You have added this department: ${(answer.department).toUpperCase()}.`)
        })
        viewAllDepartments();
    })
});  
};

function addRole () {
    getId("id", "role").then(id => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the the title of the new role you would like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of this role?"
        },
        {
            name: "departmentId",
            type: "input",
            message: "What is the department id of this role?"
        }
    ])
    .then(function(answer) {
        var query = `INSERT INTO role (id, title, salary, department_id) VALUES (${id}, '${answer.title}', ${answer.salary}, ${answer.departmentId})`;
        connection.query(query, function (err, res) {
            if (err) {
                console.log(err.message);
            }
            console.table(`You have added this role: ${(answer.title).toUpperCase()}.`)
        })
        viewAllRoles();
    })
});
};

function addEmployee () {
    getId("id", "employee").then(id => {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the new employers first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the new employers last name?"
        },
        {
            name: "roleId",
            type: "input",
            message: "What is the new employers role id?"
        },
        {
            name: "managerId",
            type: "input",
            message: "What is the managers ID?"
        }

    ])
    .then(function(answer) {
        var query = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${id}, '${answer.firstName}', '${answer.lastName}', ${answer.roleId}, ${answer.managerId})`;
        connection.query(query, answer.employee, function (err, res) {
            if (err) {
                console.log(err.message);
            }
            console.table(`You have added this employee: ${answer.firstName}, ${answer.lastName}.`)
        })
        viewAllEmployees();
    })
});
}

function updateEmployeeRole () {
    inquirer.prompt ([
    {
        name: "roleId",
        type: "input",
        message: "What is the new role id?"
    },
    {
        name: "employeeId",
        type: "input",
        message: "What is the employees ID?"
    }
])
.then(function(answer) {
        const update = `update employee set role_id ="${answer.roleId} WHERE id = ${answer.employeeId}"`;
        connection.query(update, function (err, res) {

            if (err) {
                console.log(err.message);
            }
            console.table(`You have changed the role to this employee.`)
        viewAllEmployees();
        mainMenu();
        });
    });   
}


function mainMenu () {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ]
        }
    ])
    .then(function (answer) 
        {
        if(answer.action === "View all departments") {
            viewAllDepartments();
        } else if (answer.action === "View all roles") {
            viewAllRoles();
        } else if (answer.action === "View all employees") {
            viewAllEmployees();
        } else if (answer.action === "Add a department") {
            addDepartment();
        } else if (answer.action === "Add a role") {
            addRole();
        } else if (answer.action === "Add an employee") {
            addEmployee();
        } else if (answer.action === "Update an employee role") {
            updateEmployeeRole();
        } else if (answer.action === "Exit") {
            process.exit(0);
        }
    });
}


mainMenu();