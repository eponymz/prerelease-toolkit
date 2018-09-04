const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    googleId: {
      type: String
    },
    email: {
      type: Object,
      index: true
    },
    userName: {
      type: String,
      index: true,
      unique: true
    },
    role: {
      type: String,
      index: true
    }
  },
  { timestamps: true }
);

var User = (module.exports = mongoose.model('users', userSchema));

module.exports.createUser = function(newUser, callback) {
  newUser.save(callback);
};

module.exports.searchUser = function(returnUser, callback) {
  returnUser.findOne(callback);
};
