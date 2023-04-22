require("dotenv").config();
const assert = require("assert");

const {
  HOST,
  HOST_URL,
  PORT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  EMAIL_VERIFICATION_KEY,
  SQL_SERVER,
  SQL_USER,
  SQL_DB_PASSWORD,
  SQL_DB,
  EMAIL,
  EMAIL_PASSWORD,
} = process.env;

assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST URL configuration is required.");
assert(PORT, "PORT configuration is required.");
assert(ACCESS_TOKEN_SECRET, "ACCESS_TOKEN_SECRET configuration is required.");
assert(REFRESH_TOKEN_SECRET, "REFRESH_TOKEN_SECRET configuration is required.");
assert(
  EMAIL_VERIFICATION_KEY,
  "EMAIL_VERIFICATION_KEY configuration is required."
);
assert(EMAIL, "EMAIL configuration is required.");
assert(EMAIL_PASSWORD, "EMAIL PASSOWORD configuration is required.");
assert(SQL_SERVER, "SQL SERVER configuration is required.");
assert(SQL_USER, "SQL USER configuration is required.");
assert(SQL_DB_PASSWORD, "SQL DB PASSWORD configuration is required.");
assert(SQL_DB, "SQL DB configuration is required.");

module.exports = {
  host: HOST,
  host_url: HOST_URL,
  port: PORT,
  access_token_key: ACCESS_TOKEN_SECRET,
  referesh_token_key: REFRESH_TOKEN_SECRET,
  email_verification_key: EMAIL_VERIFICATION_KEY,
  sql: {
    server: SQL_SERVER,
    user: SQL_USER,
    password: SQL_DB_PASSWORD,
    database: SQL_DB,
  },
  email: EMAIL,
  email_password: EMAIL_PASSWORD,
};
