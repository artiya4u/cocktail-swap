const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '3edsaq12W3',
  database: process.env.DB_SCHEMA || 'cocktail',
  connectionLimit: 10,
  port: process.env.DB_PORT || 3306,

});

pool.query = util.promisify(pool.query); // Magic happens here.

module.exports = pool;
