const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../../config/keys')
const winLog = require('../utils/logger')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile._json.sub
      const email = profile._json.email
      const existingUser = await User.findOne({
        // googleId: googleId,
        email: email
      })
      if (existingUser) {
        winLog.warn(
          `User ${profile._json.name} googleID is ${googleId}. Add that shit.`
        )
        return done(null, existingUser)
      } else {
        winLog.error(
          'Unauthorized login attempt made by: %O',
          // googleId,
          email
        )
        return done(null, false, existingUser)
      }
    }
  )
)
