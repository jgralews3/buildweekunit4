exports.seed = async function(knex) {
  await knex('food').truncate()
  await knex('food').insert([
        {name: 'Steak', type: 'entree'},
        {name: 'Asparagus', type: 'side'},
        {name: 'Rebel Ice Cream', type: 'dessert'}
      ]);
};
