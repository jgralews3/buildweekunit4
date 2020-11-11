exports.seed = function(knex) {
  return knex('plants').truncate()
    .then(function () {
      return knex('plants').insert([
        {nickname: "test", species: "tulip", h2oFrequency:'3'},
      ]);
    });
};
