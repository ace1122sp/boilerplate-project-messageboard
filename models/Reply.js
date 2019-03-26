const mongoose = require('mongoose');
const Thread = require('./Thread');

const { REPLY_MIN_LENGTH, REPLY_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } = require('../config/constants');

mongoose.Promise = global.Promise;

const ReplySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    min: REPLY_MIN_LENGTH,
    max: REPLY_MAX_LENGTH,
    required: true
  },
  created_on: {
    type: String,
    default: new Date()
  },
  reported: {
    type: Boolean,
    default: false
  },
  delete_password: {
    type: String,
    min: PASSWORD_MIN_LENGTH,   
    max: PASSWORD_MAX_LENGTH,
    required: true
  }
});

ReplySchema.static('report', function(_id) {
  return this.findByIdAndUpdate(_id, { reported: true });
});

ReplySchema.static('deleteWithPassword', function(_id, delete_password) {
  return this.findOneAndUpdate({ _id, delete_password }, { $set: { text: '[deleted]' } })
    .then(rec => {
      if (rec) return true;
      return false;
    })
    .catch(err => {
      console.error(err); // temp solution for development
    });
});

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;