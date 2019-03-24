const mongoose = require('mongoose');
const uuid = require('uuid/v4');

const { BOARD_NAME_MIN_LENGTH, BOARD_NAME_MAX_LENGTH } = require('../config/constants');
 
mongoose.Promise = global.Promise;

const BoardSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    min: BOARD_NAME_MIN_LENGTH,
    max: BOARD_NAME_MAX_LENGTH,
    required: true
  },
  threads: {
    type: [{
      type: [String],
      ref: 'Thread'
    }]
  }
});

BoardSchema.static('initDefault', function(name) {
  this.findOne({}, (err, rec) => {
    if (err) {
      console.error(err); // temp for development
      return Promise.reject(err);
    } else if (rec === null) {
      return this.create({ _id: uuid(), name });
    } else {
      return Promise.resolve();
    }
  });
});

BoardSchema.static('addThread', function(boardName, threadId) {
  return this.findOneAndUpdate({ name: boardName }, { $push: { threads: threadId } });
});

BoardSchema.static('removeThread', function(boardName, threadId) {
  return this.findOne({ name: boardName })
    .then(rec => {
      const updatedThreads = rec.threads.filter(thread => thread !== threadId);
      rec.threads = [...updatedThreads];
      return rec.save()
    })
    .catch(err => err);
});

BoardSchema.static('getLastTen', function(board) {
  return this.findOne({ name: board })
    .populate({ 
      path: 'threads', 
      select: '_id text created_on bumped_on reported replies', 
      options: { sort: { bumped_on: -1 }, limit: 10 },
      populate: { path: 'replies', select: '_id text created_on reported', options: { limit: 3 } } 
    });
});

BoardSchema.static('clear', function(boardName) {
  return this.findOne({ name: boardName })
    .then(rec => {
      rec.threads = [];
      return rec.save();
    })
    .catch(err => err);
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;