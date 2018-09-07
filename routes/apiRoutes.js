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
    winLog.info('Logged out successfully...');
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user);
    //res.status(200).JSON(req.user);
  });

  app.get('/z/utilities', (req, res) => {
    req.user.role === 'admin' ? res.status(200) : res.status(401);
  });

  // //CRUD button
  // app.get('/api/crud', (req, res) => {
  //   if (req.user.role !== undefined) {
  //     const role = req.user.role;
  //     if (role == 'admin') {
  //       res.send({ isAdmin: true });
  //     }
  //   } else {
  //     res.send({ isAdmin: false });
  //   }
  // });

  // CREATE
  app.post('/api/create_user', (req, res) => {
    const googleId = req.body.googleId;
    const email = req.body.emailVal;
    const userName = req.body.userName;
    const role = req.body.role;
    if (req.user) {
      const requestor = util.format('%s', req.user.userName);
      const reqRole = util.format('%s', req.user.role);

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
      if (reqRole == 'admin') {
        User.createUser(newUser, function(err) {
          if (err) throw err;
          winLog.log({
            level: 'info',
            message: 'User: ' + userName + ' created by: ' + requestor
          });
        });
        res.redirect('/z/crud');
      } else {
        res
          .send(
            'You managed to defeat client-side vaildation but my server caught you. ;)'
          )
          .status(401);
        winLog.error('unauthorized attempt to create user by: ' + requestor);
      }
    } else {
      res.redirect('/');
      winLog.warn('Invalid user session. Redirecting to login.');
    }
  });

  // READ ONE
  app.get('/api/search_user', (req, res) => {
    const userName = req.query.userName;
    if (req.user) {
      const requestor = util.format('%s', req.user.userName);
      const reqRole = util.format('%s', req.user.role);

      if (reqRole == 'admin') {
        winLog.info(
          'DB query by userName for: ' +
            userName +
            ' initiated by: ' +
            requestor
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
            let output = [
              {
                siteId: post._id
              },
              { googleId: post.googleId },
              { userName: post.userName },
              // { email: post.email },
              { role: post.role },
              { createdDt: post.createdAt },
              { updatedDt: post.updatedAt }
            ];

            res.send({
              singleUser: true,
              userData: output
            });
          })
          .catch(err => {
            winLog.error(err.stack);
            if (err.kind === 'ObjectId') {
              return res
                .status(404)
                .send({ message: 'User not found with userName: ' + userName });
            }
            return res.status(500).send({
              message: 'Error retrieving user with userName: ' + userName
            });
          });
      } else {
        res
          .send(
            'You managed to defeat client-side vaildation but my server caught you. ;)'
          )
          .status(401);
        winLog.error('unauthorized attempt to search user by: ' + requestor);
      }
    } else {
      res.redirect('/');
      winLog.warn('Invalid user session. Redirecting to login.');
    }
  });

  // UPDATE
  app.put('/api/update_user', (req, res) => {
    if (req.user) {
      const userName = req.body.userName;
      const role = req.body.role;
      if (req.user) {
        const requestor = util.format('%s', req.user.userName);
        const reqRole = util.format('%s', req.user.role);

        if (reqRole == 'admin') {
          winLog.info(
            'DB query by userName for: ' +
              userName +
              ' initiated by: ' +
              requestor
          );

          User.findOneAndUpdate(
            { userName: userName },
            { role: role },
            { returnOriginal: false }
          )
            .then(post => {
              if (!post) {
                return res.status(404).send({
                  message: 'User not found with userName: ' + userName
                });
              }
              res.send(post);
            })
            .catch(err => {
              if (err.kind === 'ObjectId') {
                return res.status(404).send({
                  message: 'User not found with userName: ' + userName
                });
              }
              return res.status(500).send({
                message: 'Error retrieving user with userName: ' + userName
              });
            });
        } else {
          res
            .send(
              'You managed to defeat client-side vaildation but my server caught you. ;)'
            )
            .status(401);
          winLog.error('unauthorized attempt to search user by: ' + requestor);
        }
      } else {
        res.redirect('/');
        winLog.warn('Invalid user session. Redirecting to login.');
      }
    } else {
      res.redirect('/');
      winLog.warn('Invalid user session. Redirecting to login.');
    }
  });

  // READ ALL
  app.get('/api/search', (req, res) => {
    if (req.user) {
      const requestor = util.format('%s', req.user.userName);
      const reqRole = util.format('%s', req.user.role);

      if (reqRole == 'admin') {
        winLog.info('DB query for all initiated by: ' + requestor);
        User.find()
          .then(post => {
            if (!post) {
              return res.status(404).send({ message: 'Request not found' });
            }
            let output = [];
            for (let i = 0; i < post.length; i++) {
              userName = post[i].userName;
              role = post[i].role;
              output.push({ userName: userName, userRole: role });
            }
            res.send({
              allUsers: true,
              userList: output
            });
            winLog.info('query for all completed');
          })
          .catch(err => {
            if (err.kind === 'ObjectId') {
              return res.status(404).send({ message: 'Request not found' });
            }
            winLog.error(err.stack);
            return res.status(500).send({
              message: 'Error retrieving users'
            });
          });
      } else {
        res
          .send(
            'You managed to defeat client-side vaildation but my server caught you. ;)'
          )
          .status(401);
        winLog.error('unauthorized attempt to search user by: ' + requestor);
      }
    } else {
      res.redirect('/');
      winLog.warn('Invalid user session. Redirecting to login.');
    }
  });
};
