/*
const {migrate} = require("pg-node-migrations");
const pg = require("pg");

var execute = async function() {
    const dbConfig = {
        database: "fharjwsz",
        user: "fharjwsz",
        password: "EnMlTdh1l3ktKqPj7zHtcEyxUAke1m0X",
        host: "localhost",
        port: 5432,
    }

    // Optional. Defaults to "public" schema and "migrations" table
    const optionalConfig = {
        schemaName: 'public',
        tableName: 'migrations',
    }

    // Note: when passing a client, it is assumed that the database already exists
    const client = new pg.Client(dbConfig) // or a Pool, or a PoolClient
    await client.connect()
    try {
        await migrate({client}, "./migrations/")
    } catch(e) {
        console.log(e);
    } finally {
        await client.end()
    }
}
//execute();
//*/
var SchemaManager = require('node-db-migrate').SchemaManager;
 
var mgr = new SchemaManager("fharjwsz", "pg", {
    "host": "localhost",
    "port": 3367,
    "user": "fharjwsz",
    "password": "EnMlTdh1l3ktKqPj7zHtcEyxUAke1m0X"
});
 
mgr.migrate('./migrations')
        .then(function() {
            // .. post-migration code ..
        })
        .catch(function(e) {
            console.error(e.message);
        })
        .finally(function() {
            mgr.close();
        })

