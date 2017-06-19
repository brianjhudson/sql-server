
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('user_account', table => {
      table.increments()
      table.string('first_name')
      table.string('last_name')
      table.string('github_username')
      table.integer('github_id')
      table.string('github_avatar')
      table.boolean('admin').defaultTo(false)
      table.timestamps()
      table.unique('github_id')
  })
};

exports.down = function(knex, Promise) {
  
};
