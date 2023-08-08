require("dotenv").config();
const env = process.env;

const config = {
    db: { /* do not put password or any sensitive info here, done only for demo */
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'artia',
        waitForConnections: true,
        connectionLimit: 2,
        queueLimit: 0,
        debug: false
    },
    listPerPage: 10,
};

module.exports = config;