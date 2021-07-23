const inquirer = require('inquirer');

mainQs = [ //!All questions will return to mainQs after prompt(s) competion
    'View All Employees', 
                //* Display all employees (id, fn, ln, title, dept, salary, manager)
                //! Console.table

    'Add Employee', 
                //|  Asks for employy fn, ln, role, manager
                //! Questions (fn, ln, role, maanger) === (input, input, choice[list of depts], choice [list of managers])

    'Update Employee Role',
                //| Asks for emply name, select role
                //! Questions (name, role) === (choice [list employees], choice[list roles])

    'View All Roles', 
                //* Displays id, title, dept name, salary of all roles
                //! Console.table

    'Add Role', //| Asks for role's name & salary & dept (-> 3 QUESTIONS)
                //! Questions (name, salary, dept) === (input, input, choice [list is departments])

    'View All Departments', 
                //* Display all departments (id, name)
                //! Console.table

    'Add Department', 
                //| Asks for name
                //! Question (name) === (input)
    'Quit'
]

const choiceDepts = []
const choiceRoles = []
const choiceManagers = []