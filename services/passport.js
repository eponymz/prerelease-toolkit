const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

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
      const existingUser = await User.findOne({
        googleId: profile.id,
        email: profile.emails
      });
      if (existingUser) {
        console.log('User ' + profile.id + ' exists. Moving along...');
        return done(null, existingUser);
      } else {
        console.log('Unauthorized login attempt made by: ' + profile.id);
        console.log(profile.emails);
        return done(null, false, existingUser);
      }

      //db.users.insert({googleId: '102216289713594720058', email: [{ value: 'sabeyfox@gmail.com', type: 'account' }], __v: '0'})

      // const user = await new User({
      //   googleId: profile.id,
      //   email: profile.emails
      // }).save();
      // done(null, user);
      // console.log('User created. Moving along...');
    }
  )
);
