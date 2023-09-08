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

config.database = {};
config.database.application_name = "financial-RW";
config.database.user = process.env.DATABASE_USER || 'postgres';
config.database.database = process.env.DATABASE_DB || 'backstage';
config.database.password = process.env.DATABASE_PW || '123456';
config.database.host = process.env.DATABASE_HOST || 'localhost';
config.database.port = process.env.DATABASE_PORT || 5432;
config.database.max = 10;
config.database.idleTimeoutMillis = 8000;
config.database.poolSize = 5;

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