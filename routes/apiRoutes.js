const User = require('../models/user');
const bodyParser = require('body-parser');
const logger = require('morgan');
const winLog = require('../logger');
const util = require('util');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    logger('dev', {
      skip: function(req, res) {
        return res.statusCode >= 400;
      },
      stream: process.stdout
    })
  );

  app.use(
    logger('dev', {
      skip: function(req, res) {
        return res.statusCode < 400;
      },
      stream: process.stderr
    })
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    console.log('Logged out successfully...');
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user);
    //res.status(200).JSON(req.user);
  });

  app.get('/api/crud', function(req, res) {
    winLog.log({
      level: 'info',
      message: 'API is live.'
    });
    res.send("I'M ALIIIIIIVVE");
  });

  // CREATE
  app.post('/api/create_user', (req, res) => {
    const googleId = req.body.googleId;
    const email = req.body.emailVal;
    const userName = req.body.userName;
    const requestor = util.format('%s', req.user.userName);

    var newUser = new User({
      googleId: googleId,
      email: [
        {
          value: email,
          type: 'account'
        }
      ],
      userName: userName
    });

    User.createUser(newUser, function(err) {
      if (err) throw err;
      winLog.log({
        level: 'info',
        message: 'User created by: ' + requestor
      });
    });
    res.redirect('/z/crud');
  });

  // READ ONE
  app.post('/api/search_user', (req, res) => {
    const userName = req.body.userName;
    const requestor = util.format('%s', req.user.userName);
    winLog.log({
      level: 'info',
      message:
        'DB query by userName for: ' + userName + ' initiated by: ' + requestor
    });

    const query = User.where({ userName: userName });
    query
      .findOne()
      .then(post => {
        if (!post) {
          return res
            .status(404)
            .send({ message: 'User not found with userName: ' + userName });
        }
        res.send(post);
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res
            .status(404)
            .send({ message: 'User not found with userName: ' + userName });
        }
        return res.status(500).send({
          message: 'Error retrieving user with userName: ' + userName
        });
      });
  });

  // READ ALL
  app.get('/api/search', (req, res) => {
    console.log('DB query for all initiated by: ' + req.user);
    User.find()
      .then(post => {
        if (!post) {
          return res.status(404).send({ message: 'Request not found' });
        }
        res.send(post);
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({ message: 'Request not found' });
        }
        return res.status(500).send({
          message: 'Error retrieving users'
        });
      });
  });
};
