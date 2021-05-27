exports.up = function (knex) {
  return knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("name", 255);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("category");
};
