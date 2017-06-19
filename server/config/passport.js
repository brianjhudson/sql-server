const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const knex = require('./knex')

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
   const user = profile._json
   user.login = user.login.toLowerCase()
   knex('user_account')
    .where({github_username: user.login})
    .then(users => {
      if (users.length && users[0].github_id) {
         return done(null, users[0])
      } else if (users.length) {
         knex('user_account')
         .where({github_username: user.login})
         .returning('*')
         .update({github_id: user.id, github_avatar: user.avatar_url})
         .then(users => {
            return done(null, users[0])
         })
         .catch(err => {
            return done(err, false)
         })
      } else {
         knex('user_account')
         .returning('*')
         .insert({github_id: user.id, github_username: user.login, github_avatar: user.avatar_url})
         .then(users => {
            return done(null, users[0])
         })
      }
    })
    .catch(err => {
      return done(err, false)
    })
  }
));

passport.serializeUser(function(user, done) {
   done(null, user);
});
passport.deserializeUser(function(user, done) {
   done(null, user);
});

module.exports = passport;