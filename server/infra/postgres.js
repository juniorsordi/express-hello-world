/*
async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.PG_DATABASE
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}
//*/
let config = {};
let localhost = true;//process.env.DATABASE_LOCAL;

config.database = {};
config.database.application_name = "financial-RW";
config.database.port = process.env.DATABASE_PORT || 5432;
config.database.max = 10;
config.database.idleTimeoutMillis = 8000;
config.database.poolSize = 5;

if(localhost) {
    config.database.user = process.env.DATABASE_USER_LOCAL || 'postgres';
    config.database.database = process.env.DATABASE_DB_LOCAL || 'backstage';
    config.database.password = process.env.DATABASE_PW_LOCAL || '123456';
    config.database.host = process.env.DATABASE_HOST_LOCAL || 'localhost';
} else {
    console.log("Using database on host: " + process.env.DATABASE_HOST_NEON);
    config.database.user = process.env.DATABASE_USER_NEON || "postgres";
    config.database.database = process.env.DATABASE_DB_NEON || "backstage";
    config.database.password = process.env.DATABASE_PW_NEON || "123456";
    config.database.host = process.env.DATABASE_HOST_NEON || "localhost";
}

const options = {
    pgFormatting: true,
    receive: function (data) {
        //camelizeColumnNames(data);
    },
    error(err, e) {
        if (e.query) {
            console.log(["Erro na query: ", e.query]);
            //if (e.params) logger.error("Params: ", e.params);
            //if (err.stack) logger.error("Stack: ", err.stack);
        } else {
            console.log(err);
        }
    }
};
const pgp = require("pg-promise")(options);

pgp.pg.types.setTypeParser(20, function (val) {
    return parseInt(val);
});

pgp.pg.types.setTypeParser(1700, (value) => {
    return parseFloat(value);
});

module.exports = pgp(config.database); 