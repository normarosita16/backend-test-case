require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    // username: "root",
    password: process.env.MYSQL_PASSWORD,
    // password: "",
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    // host: "localhost",
    dialect: "mysql",
    timezone: "+07:00",
    //migrationStorageTableSchema: "public",
    //schema: process.env.DB_SCHEMA,
    port: process.env.MYSQL_PORT,
    // port: "3306",
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    timezone: "+07:00",
    //migrationStorageTableSchema: "public",
    //schema: process.env.MYSQL_SCHEMA,
    port: process.env.MYSQL_PORT,
  },
};
