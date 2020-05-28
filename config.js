const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({
    user: 'uqnjegag',
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

module.exports = pool;