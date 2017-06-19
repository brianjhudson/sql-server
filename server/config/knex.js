const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : 'sqlapp'
  },
  pool: { min: 0, max: 21 }
});

module.exports = knex;