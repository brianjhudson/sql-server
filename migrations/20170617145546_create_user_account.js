
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('private.user_account', table => {
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
  return knex.schema.dropTableIfExists('private.user_account')
};
