const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');
const logger = require('morgan');
const winlog = require('./logger');

mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true, promiseLibrary: require('bluebird') }
  )
  .then(() => winlog.info({ message: 'DB connected successfully' }))
  .catch(err => winlog.error({ message: err }));

const app = express();

app.use(
  logger('dev', {
    skip: function(req, res) {
      return res.statusCode < 400;
    }
  })
);

app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000, // expires after 60 minutes
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/apiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve prod assets
  app.use(express.static('client/build'));

  // Express will serve up index.html if it doesnt recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  winlog.info({ message: 'Server running on port: ' + PORT });
});
