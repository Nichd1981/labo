require("dotenv").config();
const { DB_NAME, DB_USER, DB_PSW } = process.env;

const configurationSql = {
    user: DB_USER,
    password: DB_PSW,
    database: DB_NAME,
    host: "localhost",
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 300000
    },
    options:{
        trustServerCertificate: true
    }
};

module.exports = configurationSql;