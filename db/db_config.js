const dotenv = require("../configs/dotenv_config");
const mysql = require("mysql2");

const db_con = mysql.createConnection({
  host: dotenv.sql.server, // ip address of server running mysql
  user: dotenv.sql.user, // user name to your mysql database
  password: dotenv.sql.password, // corresponding password
  database: dotenv.sql.database, // use this database to querying context
});
db_con.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

module.exports = db_con;
