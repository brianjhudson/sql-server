const knex = require('../config/knex')

module.exports = {
   getUser,
   logoutUser
}

function getUser(req, res, next) {
   if (req.user) {
      res.status(200).json(req.user)
   } else {
      knex('private.user_account')
      .where({github_username: 'guestuser'})
      .select('*')
      .then(results => {
         console.log("guest")
         res.status(200).json(results[0])
      })
      .catch(err => {
         res.status(500).json(err)
      })
   }
}

function logoutUser(req, res, next) {
   req.logout()
   res.status(200).send("Logout successful")
}
