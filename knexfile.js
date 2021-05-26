// Update with your config settings.
const config = require("config");
module.exports = {
  development: {
    client: config.get("DB_CLIENT"),
    connection: {
      database: config.get("DB_NAME"),
      host: config.get("DB_HOST"),
      user: config.get("DB_USER"),
      password: config.get("DB_PASSWORD"),
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: config.get("DB_CLIENT_PRODUCTION"),
    connection: {
      database: config.get("DB_NAME_PRODUCTION"),
      host: config.get("DB_HOST_PRODUCTION"),
      user: config.get("DB_USER_PRODUCTION"),
      password: config.get("DB_PASSWORD_PRODUCTION"),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
