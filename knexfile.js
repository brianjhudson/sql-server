require('dotenv').config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'sqlapp',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
   pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'private.knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
