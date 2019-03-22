const path = require('path');

const notFound = (req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
};

const sendIndexHTML = (req, res) => {
  res.sendFile(path.resolve('views', 'index.html'));
};

const redirectToCompressedStatisJS = (req, res, next) => {
  req.url = req.url + '.gz';
  res.set({
    'Content-Encoding': 'gzip',
    'Content-Type': 'text/javascript'
  });

  next();
};

module.exports = {
  notFound,
  sendIndexHTML,
  redirectToCompressedStatisJS
};