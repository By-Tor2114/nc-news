exports.up = function(knex) {
  return knex.schema.createTable("articles", articlesTables => {
    articlesTables.increments("article_id");
    articlesTables.string("title").notNullable();
    articlesTables.text("body");
    articlesTables.integer("votes").defaultTo(0);
    articlesTables.string("topic").notNullable();
    articlesTables.string("author").references("users.username");
    articlesTables.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
