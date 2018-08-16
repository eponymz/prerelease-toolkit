const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const winLog = require('../logger');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const email = profile.emails;
      const existingUser = await User.findOne({
        googleId: googleId,
        email: email
      });
      if (existingUser) {
        console.log('User ' + profile.id + ' exists. Moving along...');
        return done(null, existingUser);
      } else {
        winLog.error(
          'Unauthorized login attempt made by: %s, %O',
          googleId,
          email
        );
        return done(null, false, existingUser);
      }

      // This is to create a new user. Taking out of this file for security reasons.
      //|
      //|
      //|
      //|
      //|
      //|
    }
  )
);
