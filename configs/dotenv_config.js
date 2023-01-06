require("dotenv").config();
const assert = require("assert");

const {
  HOST,
  HOST_URL,
  PORT,
  SECRETKEY,
  SQL_SERVER,
  SQL_USER,
  SQL_DB_PASSWORD,
  SQL_DB,
} = process.env;

assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST URL configuration is required.");
assert(PORT, "PORT configuration is required.");
assert(SECRETKEY, "SECRETKET configuration is required.");
assert(SQL_SERVER, "SQL SERVER configuration is required.");
assert(SQL_USER, "SQL USER configuration is required.");
assert(SQL_DB_PASSWORD, "SQL DB PASSWORD configuration is required.");
assert(SQL_DB, "SQL DB configuration is required.");

module.exports = {
  host: HOST,
  host_url: HOST_URL,
  port: PORT,
  secretkey: SECRETKEY,
  sql: {
    server: SQL_SERVER,
    user: SQL_USER,
    password: SQL_DB_PASSWORD,
    database: SQL_DB,
  },
};
