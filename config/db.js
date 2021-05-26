const config = require("config");
process.env.NODE_ENV = config.get("NODE_ENVIRONMENT");
const configuration = require("../knexfile")[process.env.NODE_ENV];
module.exports = require("knex")(configuration);
