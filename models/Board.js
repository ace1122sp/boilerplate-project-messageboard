const mongoose = require('mongoose');

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
      type: [mongoose.Schema.Type.ObjectId],
      ref: 'Thread'
    }]
  }
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;