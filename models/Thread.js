const mongoose = require('mongoose');

const { THREAD_MIN_LENGTH, THREAD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, DEFAULT_REPLY_LIMIT } = require('../config/constants');

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
      type: [String],
      ref: 'Reply'
    }]
  }
});

ThreadSchema.static('report', function(_id) {
  return this.findByIdAndUpdate(_id, { reported: true });
});

ThreadSchema.static('deleteWithPassword', function(_id, delete_password) {
  return Thread.findOneAndDelete({ _id, delete_password })
    .then(rec => {
      if (rec) return true;
      return false;
    })
    .catch(err => {
      console.error(err); // temp solution for development
    });
});

// returns thread with all replies
ThreadSchema.static('get', function(_id, limit = DEFAULT_REPLY_LIMIT) {
  return this.findById(_id)
    .populate({ path: 'replies' , select: '_id text created_on reported', options: { limit } });    
}); 

ThreadSchema.static('addReply', function(threadId, replyId) {
  return this.findByIdAndUpdate(threadId, { $push: { replies: replyId }, $set: { bumped_on: new Date() } });
});

ThreadSchema.static('clear', function(_id) {
  return this.findById(_id)
    .then(rec => {
      rec.replies = [];
      return rec.save();
    })
    .catch(err => err); // temp solution for development
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;