exports.up = function (knex) {
  return knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("name", 255);
    table.timestamps(true, true);
    table.integer("store_id").unsigned();
    table.foreign("store_id").references("store.id");
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("category");
};
