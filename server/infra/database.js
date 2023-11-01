
/*
const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb("good-gold-zebra-kiltCyclicDB");

const animals = db.collection("animals");
// create an item in collection with key "leo"
let leo = await animals.set("leo", {
    type: "cat",
    color: "orange"
})

// get an item at key "leo" from collection animals
let item = await animals.get("leo")
console.log(item);
//*/
const sqlite = require("./sqlite");
const postgres = require("./postgres");
//const mongo = require("./mongo");
//const mysql = require("./mariadb");

let database = null;
if(process.env.DATABASE_TYPE == "sqlite")   { database = sqlite; }
if(process.env.DATABASE_TYPE == "postgres") { database = postgres; }
//if(process.env.DATABASE_TYPE == "mongo")    { database = mongo; }
//if(process.env.DATABASE_TYPE == "mysql")    { database = mysql; }

module.exports = database;
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