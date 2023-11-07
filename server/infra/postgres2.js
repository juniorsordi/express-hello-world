const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.NEON_DATABASE,
    ssl: {
        require: true,
    },
});

module.exports = pool;