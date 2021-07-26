const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const pq = require("./assets/promptQuestions"); //* imports arrays of current roles, employees, etc, and also prompt questions
const df = require("./assets/databaseFunctions");
const hf = require("./assets/helperFunctions");

let continuePrompt = true

const db = mysql.createConnection(
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
    await hf.updateAll(db);
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
          break;
        case 'Update Employee Role':
          let updateEmplRole = await inquirer.prompt(pq.updateEmplRoleQuestions);
          df.changeRole(updateEmplRole, db);
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
          break;
        default:
          console.log(`Error in selection ${baseAns.basedQ}, please debug`);
      };
    };
  };
};

init();