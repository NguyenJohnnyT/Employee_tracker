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
function addEmployee (newEmployeeObj, db) { // newEmployeeObj {firstName, lastName, emplRole, emplManager}
    if (newEmployeeObj.emplManager !== 'None') {
        let firstLastName = newEmployeeObj.emplManager.split(' '); // [firstname, lastname]
        db.connect((err) => {
            if (err) throw err;
            db.query(
                `INSERT INTO employees (fname, lname, role_id, mngr_id)
                VALUES ('${newEmployeeObj.fname}', 
                '${newEmployeeObj.lname}', 
                (SELECT id FROM roles WHERE roles.title = '${newEmployeeObj.emplRole}'),
                (SELECT c.id FROM employees c WHERE c.fname = '${firstLastName[0]}' AND c.lname = '${firstLastName[1]}')
                );
                `,
                function (err, result) {
                    if (err) throw err;
                    console.log(
                        `Employee ${newEmployeeObj.fname} ${newEmployeeObj.lname} has been added as a/an ${newEmployeeObj.emplRole}!  ${newEmployeeObj.emplManager} is their manager.\n\n\n`
                    )
                }
            )
        });
    } else {
        db.connect((err) => {
            if (err) throw err;
            db.query(
                `INSERT INTO employees (fname, lname, role_id, mngr_id)
                VALUES ('${newEmployeeObj.fname}', 
                '${newEmployeeObj.lname}', 
                (SELECT id FROM roles WHERE roles.title = '${newEmployeeObj.emplRole}'),
                null);
                `,
                function (err, result) {
                    if (err) throw err;
                    console.log(
                        `Employee ${newEmployeeObj.fname} ${newEmployeeObj.lname} has been added as a/an ${newEmployeeObj.emplRole}!\n\n\n`
                    )
                }
            )
        });
    }
}

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
                console.log(`${updateObj.updateEmpl}'s role changed from ${oldRole} to ${newRole}!\n\n\n\n\n`)
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
        db.query(
            `INSERT INTO roles (title, salary, department_id)
            VALUES ('${addObj.addRoleName}', ${addObj.roleSalary}, (SELECT id FROM department WHERE dept_name = '${addObj.roleDept}'\n\n\n\n\n));`,
            function (err, result) {
                if (err) throw err;
                console.log(`New role ${addObj.addRoleName} (Salary: ${addObj.roleSalary} added to ${addObj.roleDept}!\n\n\n\n\n`)
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
function addDept (deptObj, db) { //deptObj = {addDept}
    newDept = deptObj.addDept;
    db.connect((err) => {
        if(err) throw err;
        db.query(
            `INSERT INTO department (dept_name)
            VALUES (?);`, [newDept],
            function (err, result) {
                if (err) throw err;
                console.log(`New department ${dept.addDept} has been added!\n\n\n`)
            }
        )
    });
};

function viewEmplByManager (managerQuery, db) { //managerQuery = {viewEmplByManager}
    let firstLastName = managerQuery.viewEmplByManager.split(' ');
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT e.id AS id FROM employees e WHERE e.fname = ? AND e.lname = ?;`,
            [firstLastName[0], firstLastName[1]],
            function (err, result) {
                if (err) throw err;
                // console.log('result', result);
                newID = result[0].id;
                db.query(
                    `
                    SELECT CONCAT(e.fname, ' ', e.lname) AS Employees,
                    (SELECT CONCAT(fname, ' ', lname) FROM employees WHERE id = e.mngr_id) AS Manager
                    FROM employees e WHERE e.mngr_id = ?;
                    `, [newID],
                    function (err,result) {
                        if (err) throw err;
                        if (result.length === 0) {
                            console.log(`\n${managerQuery.viewEmplByManager} does not manage any employees..\n\n\n\n\n`);
                        } else {
                            console.log('\n');
                            console.table(result);
                            console.log('\n\n\n\n');
                        }
                    }
                );
            }
        )
    })
}

function viewEmplByDept (deptQuery, db) { //deptQuery = {viewEmplByDept}
    let dept = deptQuery.viewEmplByDept;
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT d.id AS id FROM department d WHERE d.dept_name = ?;`,
            [dept],
            function (err, result) {
                if (err) throw err;
                newID = result[0].id;
                db.query(
                    `
                    SELECT CONCAT(employees.fname, ' ', employees.lname) AS Employees,
                    department.dept_name AS department
                    FROM employees
                    INNER JOIN roles ON roles.id = employees.role_id
                    INNER JOIN department ON department.id = roles.department_id
                    WHERE department.id= ?;
                    `, [newID],
                    function (err,result) {
                        if (err) throw err;
                        if (result.length === 0) {
                            console.log(`\n${dept} does not have any employees..\n\n\n\n\n`);
                        } else {
                            console.log('\n');
                            console.table(result);
                            console.log('\n\n\n\n');
                        }
                    }
                );
            }
        )
    })
}

function changeManager (changeManagerQuery, db) {
    if (changeManagerQuery.changeManagerEmployee === 'None') {
        return console.log('\nNothing changed\n\n\n\n\n')
    };
    let fnamelnameEmpl = changeManagerQuery.changeManagerEmployee.split(' ');
    let fnamelnameManager = changeManagerQuery.changeManager.split(' ')
    db.connect ((err) => {
        if (err) throw err;
        db.query(
            `SELECT m.id AS id FROM employees m WHERE m.fname = ? AND m.lname = ?;`, [fnamelnameManager[0], fnamelnameManager[1]],
            function (err, result) {
                if (err) throw err;
                newID = result[0].id;
                db.query(
                    `UPDATE employees
                    SET employees.mngr_id = ?
                    WHERE employees.fname = ? AND employees.lname = ?;
                    `, [newID, fnamelnameEmpl[0], fnamelnameEmpl[1]],
                    function (err, result) {
                        if (err) throw err;
                        console.log(`${changeManagerQuery.changeManagerEmployee}'s manager changed to ${changeManagerQuery.changeManager}!\n\n\n\n\n`)
                    }
                );
            }
        )
    });
};

function viewSalary (db) {
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT department.dept_name AS Department, 
            SUM(roles.salary) AS 'Combined Salaries'
            FROM department
            JOIN roles on roles.department_id = department.id
            GROUP BY department.dept_name
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

module.exports = {
    viewAllEmpl,
    viewAllRoles,
    viewAllDepts,
    changeRole,
    addRole,
    addEmployee,
    addDept,
    viewEmplByManager,
    viewEmplByDept,
    viewSalary,
    changeManager
}