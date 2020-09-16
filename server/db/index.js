const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    localhost: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

module.exports = pool;
