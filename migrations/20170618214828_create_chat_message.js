
exports.up = function(knex, Promise) {
  return knex.schema.withSchema('private').createTableIfNotExists('chat_message', table => {
      table.increments()
      table.integer('user_id')
      table.timestamp('message_date')
      table.string('message_text')
      table.timestamps()
      table.foreign('user_id').references('id').inTable('private.user_account')
  })  
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('private.chat_message') 
};
