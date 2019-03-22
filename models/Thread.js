const mongoose = require('mongoose');

const { THREAD_MIN_LENGTH, THREAD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } = require('../config/constants');

mongoose.Promise = global.Promise;

const ThreadSchema = new mongoose.Schema({
  _id: {
    type: String, 
    required: true
  },
  text: {
    type: String, 
    min: THREAD_MIN_LENGTH,
    max: THREAD_MAX_LENGTH,
    required: true
  },
  created_on: {
    type: String,
    default: new Date()
  },
  bumped_on: {
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
  },
  replies: {
    type: [{
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Reply'
    }]
  }
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;