const inquirer = require('inquirer');
const mysql = require('mysql2');
const pq = require("./assets/promptQuestions") //* imports arrays of current roles, employees, etc, and also prompt questions

console.log(pq.choiceManagers)

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '!WuuL0R.QY=C',
      database: 'superCOMPANY_db'
    },
    console.log(`Connected to the superCOMPANY_db database.`)
  );