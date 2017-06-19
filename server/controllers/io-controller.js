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
   return knex('private.chat_message')
   .join('private.user_account', 'private.user_account.id', 'private.chat_message.user_id')
   .select('first_name', 'last_name', 'github_avatar', 'private.chat_message.id', 'message_date', 'message_text')
   .then(messages => {
      emitMessages(messages, io, socket)
   })
   .catch(err => {
      console.log(err)
   })
}

function postMessage(io, data) {
   return knex('private.chat_message')
   .returning('*')
   .insert({user_id: data.user_id, message_text: data.message_text, message_date: new Date()})
   .then(messages => {
      knex('private.chat_message')
      .join('private.user_account', 'private.user_account.id', 'private.chat_message.user_id')
      .where({'private.chat_message.id': messages[0].id})
      .select('first_name', 'github_avatar', 'private.chat_message.id', 'message_date', 'message_text')
      .then(fullMessages => {
         emitMessages(fullMessages, io)
      })
   })
}