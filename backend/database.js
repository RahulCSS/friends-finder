const { Pool } = require('pg');
require('dotenv').config()

const dbpool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 5,
});

module.exports = dbpool;