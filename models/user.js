const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: String,
  email: Object
});

var User = (module.exports = mongoose.model('users', userSchema));

module.exports.createUser = function(newUser, callback) {
  newUser.save(callback);
};
