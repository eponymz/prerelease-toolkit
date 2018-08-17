const Testrail = require('testrail-api');
const keys = require('./config/keys');

const testrail = new Testrail({
  host: keys.testRailHost,
  user: keys.testRailUser,
  password: keys.testRailKey
});

module.exports = testrail;
