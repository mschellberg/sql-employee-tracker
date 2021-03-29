const mysql = require('mysql2');
const inquirer = require('inquirer');
//require('console.table');

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
    console.log('Connected!');
  });

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
    }
});

function viewAllDepartments () {
    connection.query(
        'SELECT * FROM department',
        function(err, results, fields) {
          for (const result of results) {
            process.stdout.write(`${result['id']} ${result['name']}\n`);
          }
        });
};
function viewAllRoles () {
    connection.query(
        'SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id',
        function(err, results, fields) {
          for (const result of results) {
            process.stdout.write(`${result['id']} ${result['title']} ${result['salary']} ${result['name']}\n`);
          }
        });
};
function viewAllEmployees () {
    connection.query(
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department on role.department_id = department.id',
        function(err, results, fields) {
            process.stdout.write('id\tfirst_name\tlast_name\ttitle\tname\tsalary\n');
          for (const result of results) {
            process.stdout.write(`${result['id']}\t${result['first_name']}\t${result['last_name']}\t${result['title']}\t${result['name']}\t${result['salary']}\n`);
          }
        });
};

function addDepartment() {
    inquirer.prompt([
        {
        name: "department",
        type: "input",
        message: "What department would you like to add?"
        }
    ])
    
    .then(function(answer) {
        // connection.query ("select max ") COME BACK TO THIS BECAUSE THERE ARE ISSUES
        var query = "INSERT INTO department (id, name) VALUES (?,?)";
        connection.query(query, answer.department, function (err, res) {
            if (err) {
                console.log(err.message);
            }
            console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
        })
        viewAllDepartments();
    })
    
};
function addRole () {
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
};
function addEmployee () {
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
        }
    ])
};
function updateEmployeeRole () {
};


