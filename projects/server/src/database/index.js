const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../../.env") });
const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  port: process.env.MYSQL_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log("Connected to mysql server");
});

const query = util.promisify(db.query).bind(db);
module.exports = { db, query };
