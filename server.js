require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {json} = require('body-parser')
const session = require('express-session')

const userRouter = require('./server/routes/user-routes')
const sqlRouter = require('./server/routes/sql-routes')

const passport = require('./server/config/passport')

const app = express()

app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}))
app.use(cors())
app.use(json())

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', userRouter)
app.use('/api/sql', sqlRouter)

app.listen(process.env.PORT, () => {
   console.log(`SQL App Server listening on ${process.env.PORT}`)
})