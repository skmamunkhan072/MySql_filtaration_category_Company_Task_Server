const mysql = require("mysql2");
require("dotenv").config();

var mysqlDatabaseConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "filtaration_all_data",
});

mysqlDatabaseConnection.connect((error) => {
  if (error) {
    console.log("Error in DB connection" + JSON.stringify(err, undefined, 2));
  } else {
    console.log("DB connection Successfully");
  }
});

module.exports = mysqlDatabaseConnection;
