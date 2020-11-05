
exports.up = async function(knex) {
  await knex.schema.createTable('food', tble => {
      tble.increments()
      tble.text('name').notNullable()
      tble.text('type').notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('food')
};
