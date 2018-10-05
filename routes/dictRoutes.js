const Dict = require('../models/dict');
const bodyParser = require('body-parser');
//const logger = require('morgan');
const winLog = require('../logger');
const util = require('util');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/api/dict/search', (req, res) => {
    const term = req.query.term;
    if (req.user) {
      const requestor = util.format('%s', req.user.userName);
      const reqRole = util.format('%s', req.user.role);
      if (
        (reqRole == 'admin') |
        (reqRole == 'opsLead') |
        (reqRole == 'opsUser') |
        (reqRole == 'hackDay')
      ) {
        winLog.info(`DB query by term for: ${term} initiated by: ${requestor}`);

        const query = Dict.where({ term: term });
        query
          .findOne()
          .then(post => {
            if (!post) {
              return res
                .status(404)
                .send({ message: `Term not found with title: ${term}` });
            }
            let output = [{ term: post.term }, { definition: post.definition }];

            res.send({
              singleUser: true,
              entryData: output
            });
          })
          .catch(err => {
            winLog.error(err.stack);
            if (err.kind === 'ObjectId') {
              return res
                .status(404)
                .send({ message: `Term not found with title: ${term}` });
            }
            return res.status(500).send({
              message: `Error retrieving term with title: ${term}`
            });
          });
      } else {
        res
          .send(
            'You do not have the proper role to initiate this request! Please reach out to a manager or admin.'
          )
          .status(401);
        winLog.error(`Term ${term} not found. Triggered by: ${requestor}`);
      }
    } else {
      res.redirect('/');
      winLog.warn('Invalid user session. Redirecting to login.');
    }
  });

  // SEARCH BY APLHABET VALUE
  app.get('/api/dict/alpha-search', (req, res) => {
    const letter = req.query.letter.toUpperCase();
    if (req.user) {
      const requestor = util.format('%s', req.user.userName);
      const reqRole = util.format('%s', req.user.role);
      if (
        (reqRole == 'admin') |
        (reqRole == 'opsLead') |
        (reqRole == 'opsUser') |
        (reqRole == 'hackDay')
      ) {
        winLog.info(
          `DB query by letter for: ${letter} initiated by: ${requestor}`
        );

        const query = Dict.where({ alpha: letter });
        query
          .find()
          .then(post => {
            if (!post) {
              return res.status(404).send({
                message: `Terms not found with alphabet value: ${letter}`
              });
            }
            let output = [];
            for (let i = 0; i < post.length; i++) {
              alpha = post[i].alpha;
              term = post[i].term;
              definition = post[i].definition;
              output.push({ alpha: alpha, term: term, definition: definition });
            }
            res.send({
              allUsers: true,
              entryData: output
            });
          })
          .catch(err => {
            winLog.error(err.stack);
            if (err.kind === 'ObjectId') {
              return res.status(404).send({
                message: `Terms not found with alphabet value: ${alpha}`
              });
            }
            return res.status(500).send({
              message: `Error retrieving term with title: ${term}`
            });
          });
      } else {
        res
          .send(
            'You do not have the proper role to initiate this request! Please reach out to a manager or admin.'
          )
          .status(401);
        winLog.error(`unauthorized attempt to create entry by: ${requestor}`);
      }
    } else {
      res.redirect('/');
      winLog.warn('Invalid user session. Redirecting to login.');
    }
  });

  // CREATE
  app.post('/api/dict/create', (req, res) => {
    const alphaVal = req.body.alphaVal.toUpperCase();
    const term = req.body.term;
    const definition = req.body.definition;

    if (req.user) {
      const requestor = util.format('%s', req.user.userName);
      const reqRole = util.format('%s', req.user.role);

      var newDict = new Dict({
        alpha: alphaVal,
        term: term,
        definition: definition
      });
      if (reqRole == 'admin' || reqRole == 'opsLead' || reqRole == 'hackDay') {
        Dict.createDict(newDict, function(err) {
          if (err) {
            winLog.error(`Error occured creating ${term}.\n ${err.stack}`);
            throw err;
          }
          winLog.info({
            message: `Entry: ${term} created by: ${requestor}`
          });
        });
        res.redirect('/z/ops-crud');
      } else {
        res
          .send(
            'You managed to defeat client-side vaildation but my server caught you. ;)'
          )
          .status(401);
        winLog.error(`unauthorized attempt to create entry by: ${requestor}`);
      }
    } else {
      res.redirect('/');
      winLog.warn('Invalid user session. Redirecting to login.');
    }
  });

  // DELETE
  app.delete('/api/dict/delete', (req, res) => {
    const term = req.query.term;

    if (req.user) {
      const requestor = util.format('%s', req.user.userName);
      const reqRole = util.format('%s', req.user.role);

      if (
        (reqRole == 'admin') |
        (reqRole == 'opsLead') |
        (reqRole == 'opsUser') |
        (reqRole == 'hackDay')
      ) {
        winLog.info(`${term} deleted by: ${requestor}`);

        Dict.findOneAndDelete({ term: term }, { returnOriginal: false })
          .then(post => {
            if (!post) {
              return res.status(404).send({
                message: `Term not found: ${term}`
              });
            }
            res.send(post);
          })
          .catch(err => {
            if (err.kind === 'ObjectId') {
              return res.status(404).send({
                message: `Term not found: ${term}`
              });
            }
            return res.status(500).send({
              message: `Error deleting term: ${term}`
            });
          });
      } else {
        res
          .send(
            'You managed to defeat client-side vaildation but my server caught you. ;)'
          )
          .status(401);
        winLog.error(`unauthorized attempt to delete term by: ${requestor}`);
      }
    } else {
      res.redirect('/');
      winLog.warn('Invalid user session. Redirecting to login.');
    }
  });
};
