const mongoose = require('mongoose');
const User = mongoose.model('users');

const existingUser = await User.findOne({
  googleId: 103922049060928746607,
  email: 'isabey@sofi.org'
});
module.exports = existingUser;