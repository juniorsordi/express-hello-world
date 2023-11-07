const sqlite3 = require('sqlite3').verbose();
const util    = require('util');

let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    //console.log('Connected to the chatbot database.');
});

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);
db.one = util.promisify(db.get);
db.any = util.promisify(db.all);

// empty all data from db
db.clean_db = async function() {
  await db.run("delete from users");
  await db.run("delete from members");
  await db.run("delete from guilds");
  db.run("vacuum");
}

/*
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});

async function query(sql, params) {
    const row = await db.get(sql, params, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        return row;

    });
    return row;
}

module.exports = db
//*/

// any kind of other function ...
// and then export your module
module.exports = db;