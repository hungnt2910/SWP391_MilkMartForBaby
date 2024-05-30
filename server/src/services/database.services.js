const sql = require("mssql");

const sqlConfig = {
  user: "SA",
  password: "Khai200704@",
  server: "localhost",
  database: "MilkShopSystem",
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
  },
};

const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to the database.");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed: ", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
