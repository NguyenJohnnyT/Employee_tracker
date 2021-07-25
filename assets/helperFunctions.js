const pq = require("./promptQuestions")
// TODO: Functions for each mainQ answers
//* View All Employees
     //* Display all employees (id, fn, ln, title, dept, salary, manager)
    //! Console.table
async function viewAllEmpl (db) {
    const allEmpl = await db.connect((err) => {
        if (err) throw err;
        db.query("SELECT * FROM employee", function (err, result, fields) {
            if (err) throw err;
            console.log('\n');
            console.table(result);
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


//* Add Role
    //| Asks for role's name & salary & dept (-> 3 QUESTIONS)
    //! Questions (name, salary, dept) === (input, input, choice [list is departments])


//* View All Departments
    //* Display all departments (id, name)
    //! Console.table


//* Add Department
    //| Asks for name
    //! Question (name) === (input)

module.exports = {
    viewAllEmpl
}