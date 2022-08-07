const mysql = require("mysql");

// creating sql connection
const { DB_HOST, DB_PORT, DB_USER, DB_DATABASE } = process.env;

const dbconn = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  database: DB_DATABASE,
});

dbconn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected successfully");
});

module.exports = dbconn;
