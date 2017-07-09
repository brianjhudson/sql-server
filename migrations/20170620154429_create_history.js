
exports.up = function(knex, Promise) {
  return knex.schema.withSchema('private').createTableIfNotExists('query_history', table => {
      table.increments()
      table.integer('user_id')
      table.timestamp('query_date')
      table.string('query_text')
      table.timestamps()
      table.foreign('user_id').references('id').inTable('private.user_account')
  })  
  
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('private.query_history')   
};
