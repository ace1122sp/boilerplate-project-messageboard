const { PRODUCTION } = require('./constants');

module.exports = (() => {
  const env = process.env.NODE_ENV;

  if (env === PRODUCTION) return require(`./config.${env}`);
  return require('./config.development');
})();