
//const sqlite = require("./sqlite");
const postgres = require("./postgres");
//const mongo = require("./mongo");
//const mysql = require("./mariadb");
//const dynamodb = require("./dynamodb");

let database = null;
//if(process.env.DATABASE_TYPE == "sqlite")   { database = sqlite; }
if(process.env.DATABASE_TYPE == "postgres") { database = postgres; }
//if(process.env.DATABASE_TYPE == "mongo")    { database = mongo; }
//if(process.env.DATABASE_TYPE == "mysql")    { database = mysql; }

module.exports = database;