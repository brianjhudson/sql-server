
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('private.chat_message', table => {
      table.increments()
      table.integer('user_id')
      table.timestamp('message_date')
      table.string('message_text')
      table.timestamps()
      table.foreign('user_id').references('user_account.id')
  })  
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('private.chat_message') 
};
