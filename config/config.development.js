const { DEVELOPMENT } = require('./constants');

module.exports = {
  app: {
    port: 3000,
    env: DEVELOPMENT
  },
  db : {
    mongoURI: 'mongodb://localhost:27017/message-board'
  }
};