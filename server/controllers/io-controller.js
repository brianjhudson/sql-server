const knex = require('../config/knex')

module.exports = {
   logConnection,
   postMessage,
   retrieveMessages
}

function logConnection(event, data) {
   console.log(event, ':')
   console.log(data)
}

function emitMessages(messages, io, socket) {
   if (!socket) {
      io.emit('newMessages', messages)
   } else {
      io.to(socket.id).emit('newMessages', messages)
   }
}

function retrieveMessages(io, socket) {
   return knex('chat_message')
   .join('user_account', 'user_account.id', 'chat_message.user_id')
   .select('user_account.first_name', 'user_account.github_avatar', 'chat_message.id', 'chat_message.message_date', 'chat_message.message_text')
   .then(messages => {
      emitMessages(messages, io, socket)
   })
   .catch(err => {
      console.log(err)
   })
}

function postMessage(io, data) {
   return knex('chat_message')
   .returning('*')
   .insert({user_id: data.user_id, message_text: data.message_text, message_date: new Date()})
   .then(messages => {
      knex('chat_message')
      .join('user_account', 'user_account.id', 'chat_message.user_id')
      .where({'chat_message.id': messages[0].id})
      .select('user_account.first_name', 'user_account.github_avatar', 'chat_message.id', 'chat_message.message_date', 'chat_message.message_text')
      .then(fullMessages => {
         emitMessages(fullMessages, io)
      })
   })
}