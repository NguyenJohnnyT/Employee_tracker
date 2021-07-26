const pq = require("./promptQuestions");
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
            console.log('\n\n\n\n\n\n');
        });
    });
};

//* Add Employee
    //|  Asks for empl fn, ln, role, manager
    //! Questions (fn, ln, role, maanger) === (input, input, choice[list of depts], choice [list of managers])


//* Update Employee Role
    //| Asks for empl name, select role
    //! Questions (name, role) === (choice [list employees], choice[list roles])
function changeRole (updateObj, db) {
    let firstLastName = updateObj.updateEmpl.split(' '); // [firstname, lastname]
    let oldRole = ''
    db.connect((err) => { //Obtain oldRole
        if (err) throw err;
        db.query(
            `SELECT roles.title FROM roles WHERE roles.id = 
            (SELECT employees.role_id FROM employees 
            WHERE employees.fname = '${firstLastName[0]}' AND employees.lname = '${firstLastName[1]}')`,
            function (err, result) {
                if (err) throw err;
                oldRole = result[0].title;
            }
        )
    });
    let newRole = updateObj.changeRole; //returns the role name
    db.connect((err) => { //Update Role
        if (err) throw err;
        db.query(
            `UPDATE employees
            SET role_id = (SELECT id FROM roles WHERE title='${newRole}')
            WHERE employees.fname = '${firstLastName[0]}' AND employees.lname = '${firstLastName[1]}'
            `,
            function (err, result, fields) {
                if (err) throw err;
                console.log('\n');
                console.log(`${updateObj.updateEmpl}'s role changed from ${oldRole} to ${newRole}!`)
            }
        )
    })
}

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
            function (err, result) {
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
function addRole (addObj, db) { // addObj = {addRoleName, roleSalary, roleDept}
    db.connect((err) => {
        if(err) throw err;
        console.log(
            `INSERT INTO roles (title, salary, department_id)
            VALUES ('${addObj.addRoleName}', ${addObj.roleSalary}, (SELECT id FROM department WHERE dept_name = '${addObj.roleDept}'))`
        )
        db.query(
            `INSERT INTO roles (title, salary, department_id)
            VALUES ('${addObj.addRoleName}', ${addObj.roleSalary}, (SELECT id FROM department WHERE dept_name = '${addObj.roleDept}'));`,
            function (err, result) {
                if (err) throw err;
                console.log(`New role ${addObj.addRoleName} (Salary: ${addObj.roleSalary} added to ${addObj.roleDept}!`)
            }
        )
    });
};

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
            function (err, result) {
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
    viewAllDepts,
    changeRole,
    addRole,
}