require('dotenv').config();
var util = require("util");
const fs = require("fs");
const { Pool, Client } = require("pg");

let config = {};
config.database = {};
let localhost = process.env.DATABASE_LOCAL;
config.database.port = process.env.DATABASE_PORT || 5432;
if(localhost) {
    config.database.database = process.env.DATABASE_DB;
    config.database.user = process.env.DATABASE_USER_LOCAL || 'postgres';
    config.database.password = process.env.DATABASE_PW_LOCAL || '123456';
    config.database.host = process.env.DATABASE_HOST_LOCAL || 'localhost';
} else {
    config.database.database = process.env.DATABASE_DB || "teste";
    config.database.user = process.env.DATABASE_USER || 'postgres';
    config.database.password = process.env.DATABASE_PW || '123456';
    config.database.host = process.env.DATABASE_HOST || 'localhost';
}

const pool = new Pool(config.database);
async function getClient() {
    try {
        const client = await pool.connect()
        //console.log(client);
        //await client.connect();
        return client;
    } catch (error) {
        console.log(error);
    }
    
}

async function migrate() {
    const client = await getClient();
    // Check previous migrations
    let existingMigrations = [];
    try {
        let result = await client.query("SELECT * FROM migrations");
        existingMigrations = result.rows.map(r => r.file)
    } catch {
        console.warn("First migration");
    }
    
    // Get outstanding migrations
    const outstandingMigrations = await getOutstandingMigrations(
        existingMigrations
    );

    try {
        // Start transaction
        await client.query("BEGIN");

        let results = [];
        // Run each migration sequentially in a transaction
        for (let migration of outstandingMigrations) {
            console.log(migration.file);
            try {
                // Run the migration
                await client.query(migration.query.toString());
                // Keep track of the migration
                let temp = await client.query("INSERT INTO migrations (file) VALUES ($1)", [
                    migration.file,
                ]);
                results.push(temp);
            } catch (error) {
                console.log(error);
            }
            
        }

        // All good, we can commit the transaction
        await client.query("COMMIT");

        return results;
    } catch (err) {
        // Oops, something went wrong, rollback!
        await client.query("ROLLBACK");
    } finally {
        // Don't forget to release the client!
        //client.release();
        client.end();
    }
}

async function getOutstandingMigrations(migrations = []) {
    const files = await util.promisify(fs.readdir)(__dirname+"/migrations/");
    const sql = await Promise.all(
        files
        .filter((file) => file.split(".")[1] === "sql")
        .filter((file) => !migrations.includes(file))
        .map(async (file) => ({
            file,
            query: await util.promisify(fs.readFile)(`${__dirname}/migrations/${file}`, {
            encoding: "utf-8",
            }),
        }))
    );

  return sql;
}

async function adjustAutoIncrementIndexes(client) {
    let tables = await client.query("SELECT * FROM pg_catalog.pg_tables where schemaname = 'public' and tableowner in ('fharjwsz', 'postgres') order by tablename");
    //console.log(tables);
    ///*
    for(const table of tables.rows) {
        //console.log(table.tablename);
        let SQL = `SELECT SETVAL('${table.tablename}_id_seq', (SELECT MAX(id) FROM ${table.tablename}))`;
        await client.query(SQL);
    }
    //*/
    client.end();
}

//migration();
(async () => {
    try {
        console.log(config.database);
        let sql = await migrate();
        console.log(sql);
        await adjustAutoIncrementIndexes(await getClient());
    } catch (e) {
        console.log(e);
        // Deal with the fact the chain failed
    }
})();
