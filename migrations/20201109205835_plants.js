exports.up = function(knex) {
    return knex.schema.createTable('plants', plants => {
      plants.increments();
      plants.string('nickname', 255).notNullable().unique();
      plants.string('species', 255).notNullable();
      plants.integer('h2oFrequency', 100).notNullable();
      plants.string('imageUrl')
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants');
  };
  