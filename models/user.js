const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: String,
  email: Object
});

mongoose.model('users', userSchema);
