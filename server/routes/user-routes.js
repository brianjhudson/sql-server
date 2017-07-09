const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/github', (req, res, next) => {
   console.log("At auth")
   next()
},passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', (req, res, next) => {
   passport.authenticate('github', (err, user, info) => {
      if (err) {
         return next(err)
      } else if (!user) {
         return res.status(401).json(info)
      } else {
         req.logIn(user, err => {
            if (err) {
               return next(err)
            }
            return res.redirect(process.env.REDIRECT_PATH)
         })
      }
   })(req, res, next)
});

router.get('/login', (req, res, next) => {
   console.log("Hello")
   //   console.log(req.user)
     res.send(req.user)
  })

module.exports = router