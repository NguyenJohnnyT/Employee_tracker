const pq = require("./promptQuestions")
// TODO: Functions for each mainQ answers

//* View All Employees
     //* Display all employees (id, fn, ln, title, dept, salary, manager)
    //! Console.table
function viewAllEmpl (db) {
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT e.id AS ID, e.fname AS 'First Name', e.lname as 'Last Name', roles.title AS Title, department.dept_name AS Department, roles.salary AS Salary, (SELECT CONCAT(fname, ' ',lname) FROM employees WHERE id = e.mngr_id) AS Manager
            FROM employees e
            INNER JOIN roles ON e.role_id=roles.id
            INNER JOIN department ON roles.department_id=department.id
            ORDER BY e.id;
            `,
            function (err, result, fields) {
            if (err) throw err;
            result.forEach((obj) => {
                if (obj.Manager === null || obj.Manager === 'null') {
                    obj.Manager = '---'
                }
            })
            console.log('\n');
            console.table(result);
            console.log('\n\n\n\n');
        });
    });
};

//* Add Employee
    //|  Asks for empl fn, ln, role, manager
    //! Questions (fn, ln, role, maanger) === (input, input, choice[list of depts], choice [list of managers])


//* Update Employee Role
    //| Asks for empl name, select role
    //! Questions (name, role) === (choice [list employees], choice[list roles])


//* View All Roles
    //* Displays id, title, dept name, salary of all roles
    //! Console.table
function viewAllRoles (db) {
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT r.id AS ID, r.title AS 'Title', department.dept_name as 'Department Name', r.salary AS Salary
            FROM roles r
            INNER JOIN department ON r.department_id=department.id
            ORDER BY r.id;
            `,
            function (err, result, fields) {
                if (err) throw err;
                console.log('\n');
                console.table(result);
                console.log('\n\n\n\n');
            }
        )
    })
}

//* Add Role
    //| Asks for role's name & salary & dept (-> 3 QUESTIONS)
    //! Questions (name, salary, dept) === (input, input, choice [list is departments])


//* View All Departments
    //* Display all departments (id, name)
    //! Console.table
function viewAllDepts (db) {
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT d.id AS 'Department ID', d.dept_name AS 'Department Name'
            FROM department d;
            `,
            function (err, result, fields) {
                if (err) throw err;
                console.log('\n');
                console.table(result);
                console.log('\n\n\n\n');
            }
        )
    })
}

//* Add Department
    //| Asks for name
    //! Question (name) === (input)

module.exports = {
    viewAllEmpl,
    viewAllRoles,
    viewAllDepts
}