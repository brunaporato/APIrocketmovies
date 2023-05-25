exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id").primary();
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.text("name");
});

exports.down = knex => knex.schema.dropTable("tags");
