const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const pq = require("./assets/promptQuestions"); //* imports arrays of current roles, employees, etc, and also prompt questions
const df = require("./assets/databaseFunctions"); //* imports functions that will read/write into the database
const hf = require("./assets/helperFunctions"); //* imports functions that will update arrays containing departments, roles, and employees

let continuePrompt = true;

const db = mysql.createConnection( //connect to mySQL
    {
      host: 'localhost',
      user: 'root',
      password: '!WuuL0R.QY=C',
      database: 'superCOMPANY_db'
    },
    console.log('✅ Connected to the superCOMPANY_db database. ✅')
);

async function init() {
  while (continuePrompt) {
    hf.updateAll(db);
    let baseAns = await inquirer.prompt(pq.baseQuestion);
    if (baseAns.basedQ === 'Quit') {
      continuePrompt = false;
      console.log('✨ Goodbye! ✨');
      process.exit();
    } else {
      switch(baseAns.basedQ) {
        case 'View All Employees':
          df.viewAllEmpl(db);
          break;
        case 'Add Employee':
          let newEmplObj = await inquirer.prompt(pq.addEmplQuestions);
          df.addEmployee(newEmplObj, db);
          break;
        case 'Update Employee Role':
          let updateEmplRole = await inquirer.prompt(pq.updateEmplRoleQuestions);
          df.changeRole(updateEmplRole, db);
          break;
        case 'Change employee\'s manager':
          let changeManagerQuery = await inquirer.prompt(pq.changeManagerQuestions);
          console.log(changeManagerQuery)
          df.changeManager(changeManagerQuery, db);
          break;
        case 'View All Roles':
          df.viewAllRoles(db);
          break;
        case 'Add Role':
          let newRole = await inquirer.prompt(pq.addRoleQuestions);
          df.addRole(newRole, db);
          break;
        case 'View All Departments':
          df.viewAllDepts(db);
          break;
        case 'Add Department':
          let newDept = await inquirer.prompt(pq.addDeptQuestions);
          df.addDept(newDept, db);
          break;
        case 'View employees by manager':
          let managerQuery = await inquirer.prompt(pq.viewEmplByManagerQuestions);
          df.viewEmplByManager(managerQuery, db);
          break;
        case 'View employees by department':
          let deptQuery = await inquirer.prompt(pq.viewEmplByDeptQuestions);
          df.viewEmplByDept(deptQuery, db);
          break;
        case 'View Combined Salaries of Individual Departments':
          df.viewSalary(db);
          break
        default:
          console.log(`Error in selection ${baseAns.basedQ}, please debug`);
      };
    };
  }
};

init();