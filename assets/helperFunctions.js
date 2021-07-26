const {choiceDepts, choiceRoles, choiceEmpl} = require('./promptQuestions');

let concat = "CONCAT(fname, ' ', lname)"
//* updateAll runs four functions updateDepts, updateRoles, updateEmpl that each return an updated array of choices for their respective descriptors [DONE]
const updateAll = async (db) => {
    await updateDepts(db);
    await updateRoles(db);
    await updateEmpl(db);
};

const updateDepts = async (db) => {
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT dept_name FROM department`,
            function (err, result, fields) {
                if (err) throw err;
                result.forEach((obj) => {
                    if (!choiceDepts.includes(obj.dept_name)) {
                        choiceDepts.push(obj.dept_name);
                    };
                });
            }
        );
    });
    return //'an array of current and new departments'
};

const updateRoles = async (db) => {
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT title FROM roles`,
            function (err, result, fields) {
                if (err) throw err;
                result.forEach((obj) => {
                    if (!choiceRoles.includes(obj.title)) {
                        choiceRoles.push(obj.title)
                    };
                });
            }
        );
    });
    return //'an array of current and new roles'
};

const updateEmpl = async (db) => {
    db.connect((err) => {
        if (err) throw err;
        db.query(
            `SELECT ${concat} FROM employees`,
            function (err, result, fields) {
                if (err) throw err;
                result.forEach((obj) => {
                    if (!choiceEmpl.includes(obj[concat])) {
                        choiceEmpl.push(obj[concat]);
                    };
                    if (!choiceEmpl.includes('None')) {
                        choiceEmpl.unshift('None');
                    }
                });
            }
        );
    });
    return //'an array of old and new employees'
}

async function timer () {
    setTimeout(() => {}, 100)
}

module.exports = {
    updateAll,
    timer
}