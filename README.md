![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
# Employee tracker app
Track and change employee information

## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Tests](#tests)
* [Questions](#questions)

## Description

This nodejs application uses inquirer, mysql2, and console.table packages to help manage and track employees in a company database called ```SUPERCOMPANY_DB```.  In this application, the user will recieve user-friendly prompts in which they can do the following:

<ol>
<li>View all employees, departments, and roles</li>
<li>View employees by manager</li>
<li>View employees by department</li>
<li>Add a department to the database</li>
<li>Add a role to the database</li>
<li>Add an employee to the database</li>
<li>Update an employee role</li>
<li>Update an employee's manager</li>
<li>View combined salary of each department</li>
</ol>

## Installation

Installations required: [node.js](https://nodejs.org/en/), [mysql](https://www.mysql.com/)

When cloning the files, complete an <code>npm i</code> in the terminal at the directory where the ```package.json``` is located.  Inquirer, mysel2, and console.table packages will be installed for application use.  Be sure to ```SOURCE schema.sql``` and ```SOURCE seed.sql``` to create and populate the database. The user will need to access line 14 of ```index.js``` file and insert their own mySQL password in order to use this application.

[GitHub link to repository](https://github.com/NguyenJohnnyT/Note_Taker)

[Deployed Website Link](https://radiant-atoll-78940.herokuapp.com/)

## Usage

When the user starts the application, they will be notified that they are connected a database (if a valid username and password was supplised in the ```index.js``` file).  They will then be given a series of prompts to choose from including viewing all employees, changing a role, etc.  Follow the instructions and verify that the database is changed by selecting any prompts that view departments, employees, and roles.  See the video below for a usage example.

[Video link](https://streamable.com/l4ww8t)

## License

This application is licensed under [MIT]((https://opensource.org/licenses/MIT)).

## Contributors

Anyone can contribute to this project.

## Tests

No tests available.

## Questions
Have a question? Please email me at johnnytrucnguyen@gmail.com

[My Github](https://www.github.com/nguyenjohnnyt)