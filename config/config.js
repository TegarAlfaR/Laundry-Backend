const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USER || "postgres",
    password: process.env.DB_DEV_PASS || "postgres",
    database: process.env.DB_DEV_NAME || "my_local_db",
    host: process.env.DB_DEV_HOST || "127.0.0.1",
    port: process.env.DB_DEV_PORT || 5432,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
