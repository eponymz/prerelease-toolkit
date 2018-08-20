const User = require('../models/user');
const bodyParser = require('body-parser');
//const logger = require('morgan');
const winLog = require('../logger');
const util = require('util');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

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

  //CRUD button
  app.get('/api/crud', (req, res) => {
    // const userName = util.format('%s', req.user.userName);
    // const isAdmin = User.where({ userName: userName, role: 'admin' });
    // isAdmin.findOne().then(post => {
    //   if (isAdmin) {
    //     res.send({ isAdmin: true });
    //     // winLog.info(post);
    //     console.log(post);
    //   }
    //   res.send({ isAdmin: false });
    // });
    // console.log(isAdmin);
    // res.send(isAdmin);
    const role = req.user.role;
    if (role == 'admin') {
      res.send({ isAdmin: true });
    } else {
      res.send({ isAdmin: false });
      winLog.error('unauthorized attempt to get to crud');
    }
  });

  // CREATE
  app.post('/api/create_user', (req, res) => {
    const googleId = req.body.googleId;
    const email = req.body.emailVal;
    const userName = req.body.userName;
    const role = req.body.role;
    const requestor = util.format('%s', req.user.userName);

    var newUser = new User({
      googleId: googleId,
      email: [
        {
          value: email,
          type: 'account'
        }
      ],
      userName: userName,
      role: role
    });

    User.createUser(newUser, function(err) {
      if (err) throw err;
      winLog.log({
        level: 'info',
        message: 'User: ' + userName + ' created by: ' + requestor
      });
    });
    res.redirect('/z/crud');
  });

  // READ ONE
  app.post('/api/search_user', (req, res) => {
    const userName = req.body.userName;
    const requestor = util.format('%s', req.user.userName);
    winLog.info(
      'DB query by userName for: ' + userName + ' initiated by: ' + requestor
    );

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
    const requestor = util.format('%s', req.user.userName);
    winLog.info('DB query for all initiated by: ' + requestor);
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
