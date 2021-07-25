//* Update upon command these arrays with department names, roles, and managers
const choiceDepts = []
const choiceRoles = []
const choiceManagers = ['None']
const choiceEmpl = []

//* Main array for base questions
const mainQs = [ //!All questions will return to mainQs after prompt(s) competion
    'View All Employees', 
                //* Display all employees (id, fn, ln, title, dept, salary, manager)
                //! Console.table

    'Add Employee', 
                //|  Asks for empl fn, ln, role, manager
                //! Questions (fn, ln, role, maanger) === (input, input, choice[list of depts], choice [list of managers])

    'Update Employee Role',
                //| Asks for empl name, select role
                //! Questions (name, role) === (choice [list employees], choice[list roles])

    'View All Roles', 
                //* Displays id, title, dept name, salary of all roles
                //! Console.table

    'Add Role', 
                //| Asks for role's name & salary & dept (-> 3 QUESTIONS)
                //! Questions (name, salary, dept) === (input, input, choice [list is departments])

    'View All Departments', 
                //* Display all departments (id, name)
                //! Console.table

    'Add Department', 
                //| Asks for name
                //! Question (name) === (input)
    'Quit'
]

//* Main questions, follow up questions
const baseQuestion = [
    {
        name: 'basedQ',
        message: 'What would you like to do?',
        type: 'list',
        choices: mainQs
    }
]

const addEmplQuestions = [
    {
        name: 'firstName',
        message: 'Employee first name?',
        type: 'input'
    },
    {
        name: 'lastName',
        message: 'Employee last name?',
        type: 'input'
    },
    {
        name: 'emplRole',
        message: 'Choose their role',
        type: 'list',
        choices: choiceRoles,
    },
    {
        name: 'emplManager',
        message: 'Choose their manager, if applicable',
        type: 'list',
        choices: choiceManagers,
    }
];

const updateEmplRoleQuestions = [
    {
        name: 'updateEmpl',
        message: 'Choose an employee',
        type: 'list',
        choice: choiceEmpl
    },
    {
        name: 'changeRole',
        message: 'Choose a role to assign them',
        type: 'list',
        choice: choiceRoles,
    }
];

const addRoleQuestions = [
    {
        name: 'addRoleName',
        message: "Enter a name for the role",
        type: 'input',
    },
    {
        name: 'roleSalary',
        message: 'Enter a salary for the role',
        type: 'number',
    },
    {
        name: 'roleDept',
        message: 'What department does the role belong to?',
        type: choiceDepts
    }
]

const addDeptQuestions = [
    {
        name: 'addDept',
        message: 'What is the name of the department?',
        type: 'input'
    }
]

module.exports = {
    choiceEmpl,
    choiceDepts,
    choiceManagers,
    choiceRoles,
    baseQuestion,
    addEmplQuestions,
    updateEmplRoleQuestions,
    addRoleQuestions,
    addDeptQuestions
}
