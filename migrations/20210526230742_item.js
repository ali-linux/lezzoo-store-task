exports.up = function (knex) {
  return knex.schema.createTable("item", (table) => {
    table.increments("id").primary();
    table.string("name", 255);
    table.string("image");
    table.decimal("price", 10, 2).unsigned();
    table.integer("stock").unsigned();
    table.integer("category_id").unsigned();
    table.foreign("category_id").references("category.id");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("item");
};
