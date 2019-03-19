const mongoose = require('mongoose');

const { REPLY_MIN_LENGTH, REPLY_MAX_LENGTH } = require('../config/constants');

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

const Reply = mongoose.model();

module.exports = Reply;