const knex = require('../config/knex')

module.exports = {
   getTables,
   executeQuery
}

function getTables(req, res, next) {
   knex('information_schema.columns')
   .where({'table_schema': 'public'})
   .select('table_name', 'column_name', 'data_type')
   .then(results => {
      res.send(results)
   })
   .catch(err => {
      next(err)
   })
}

function executeQuery(req, res, next) {
   let forbiddenCommands = ['drop', 'truncate', 'delete', 'createuser', 'createrole', 'alter', 'database', 'role', 'user_account']
   for (let cmd of forbiddenCommands) {
      if (req.body.query.toLowerCase().split(' ').join('').includes(cmd)) {
         return res.status(403).json({error: "You have entered a forbidden command"})
      }
   }
   knex.raw(req.body.query)
   .then(results => {
      res.send(results)
   })
   .catch(err => {
      next(err)
   })
}
