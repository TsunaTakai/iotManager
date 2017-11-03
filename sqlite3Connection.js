//require('dotenv').config();
const sqlcon = process.env.NODE_SQLITE;
console.log(sqlcon);

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(sqlcon);

module.exports = db;