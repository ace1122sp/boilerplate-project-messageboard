const mongoose = require('mongoose');

module.exports = dbURI => {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbURI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
      console.log('connected to db');
    })
    .catch(err => {});
};