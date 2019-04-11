const { PRODUCTION } = require('../../config/constants');

module.exports = env => {  
  if (env === PRODUCTION) {
    return require('./production');
  } else {
    return require('./development');
  }  
};
