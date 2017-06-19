const ioController = require('../controllers/io-controller.js')

module.exports = io => {
   io.on('connection', socket => {
      ioController.logConnection('Connection', socket.id)
      socket.on('postMessage', ioController.postMessage.bind(null, io))
      socket.on('retrieveMessages', ioController.retrieveMessages.bind(null, io, socket))
      socket.on('disconnect', ioController.logConnection.bind(null, 'Disconnection', socket.id))
   })
}