const knex = require('../config/knex')
const _ = require('underscore')

module.exports = {
   getTables,
   executeQuery
}

function getTables(req, res, next) {
   knex('information_schema.columns')
   .where({'table_schema': 'public'})
   .select('table_name', 'column_name', 'data_type')
   .then(results => {
      const newResults = _.groupBy(results, 'table_name')
      res.send(newResults)
   })
   .catch(err => {
      next(err)
   })
}

function executeQuery(req, res, next) {
   let forbiddenCommands = ['createuser', 'database', 'role', 'private']
   if (!req.user || !req.user.recognized) {
      forbiddenCommands = forbiddenCommands.concat(['create', 'drop', 'update', 'delete'])
   }
   const query = req.body.query.toLowerCase()
   for (let cmd of forbiddenCommands) {
      if (query.includes(cmd)) {
         let message = cmd.toUpperCase() + " is a forbidden command"
         let position = query.indexOf(cmd)
         return res.status(200).json({error: true, message, position})
      }
   }
   knex.raw(req.body.query)
   .then(results => {
      res.send(results)
   })
   .catch(err => {
      return res.status(201).json({error: true, message: err.message, position: err.position})
   })
}
