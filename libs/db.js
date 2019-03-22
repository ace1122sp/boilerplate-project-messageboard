const mongoose = require('mongoose');
const Board = require('../models/Board');

module.exports = dbURI => {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbURI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => Board.initDefault('general'))
    .then(() => {
      console.log('connected to db');
    })
    .catch(err => {
      console.error(err); // temp solution for dev
    });
};