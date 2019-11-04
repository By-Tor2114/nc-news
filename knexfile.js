const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";
const login = require("./config-login");

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "nc_news",
      username: login.user,
      password: login.pass
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: login.user,
      password: login.pass
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
