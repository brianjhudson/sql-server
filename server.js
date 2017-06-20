require('dotenv').config()
const express = require('express')
const http = require('http')
const socket_io = require('socket.io')
const cors = require('cors')
const {json} = require('body-parser')
const session = require('express-session')

const userRouter = require('./server/routes/user-routes')
const sqlRouter = require('./server/routes/sql-routes')

const passport = require('./server/config/passport')

const app = express()
const httpServer = http.Server(app)
const io = socket_io(httpServer)
require('./server/routes/io-routes')(io)

app.use(express.static(__dirname + '/build'))
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}))
app.use(cors({credentials: true, origin: ['brianjhudson.com', 'github.com']}))
app.use(json())

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', userRouter)
app.use('/api/sql', sqlRouter)

app.get('*', function(req, res) {
   res.sendFile(__dirname + '/build/index.html')
})
httpServer.listen(process.env.PORT, () => {
   console.log(`SQL App Server listening on ${process.env.PORT}`)
})