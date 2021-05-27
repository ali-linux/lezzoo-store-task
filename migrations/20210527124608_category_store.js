exports.up = function (knex) {
  return knex.schema.createTable("store_category", (table) => {
    table.integer("store_id").unsigned();
    table.integer("category_id").unsigned();
    table
      .foreign("category_id")
      .references("category.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .foreign("store_id")
      .references("store.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("store_category");
};
