exports.up = function (knex) {
  return knex.schema.createTable("store", (table) => {
    table.increments("id").primary();
    table.string("name", 255);
    table.string("email", 255);
    table.string("logo", 255);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("store");
};
