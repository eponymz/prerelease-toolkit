const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dictSchema = new Schema(
  {
    alpha: {
      type: String,
      index: true
    },
    term: {
      type: String,
      index: true
    },
    definition: {
      type: String,
      index: true
    }
  },
  { timestamps: true }
);

var Dict = (module.exports = mongoose.model('dict', dictSchema));

module.exports.createDict = function(newDict, callback) {
  newDict.save(callback);
};
