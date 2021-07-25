const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const pq = require("./assets/promptQuestions"); //* imports arrays of current roles, employees, etc, and also prompt questions
const hf = require("./assets/helperFunctions");

let continuePrompt = true
console.log('pq.choiceManagers', pq.choiceManagers)

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '!WuuL0R.QY=C',
      database: 'superCOMPANY_db'
    },
    console.log(`Connected to the superCOMPANY_db database.`)
);

async function init() {
  while (continuePrompt) {
    let baseAns = await inquirer.prompt(pq.baseQuestion);
    if (baseAns.basedQ === 'Quit') {
      continuePrompt = false;
      console.log('Good Bye');
      process.exit();
    } else {
      switch(baseAns.basedQ) {
        case 'View All Employees':
          await hf.viewAllEmpl(db);
          break;
        case 'Add Employee':
          break;
        case 'Update Employee Role':
          break;
        case 'View All Roles':
          break;
        case 'Add Role':
          break;
        case 'View All Departments':
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