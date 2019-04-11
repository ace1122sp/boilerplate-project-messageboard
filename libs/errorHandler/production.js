module.exports = (() => {
  const testExit = err => {
    console.log('Error ---');
  }

  const asyncTest = testExit;

  const logErrors = (err, req, res, next) => {
    console.log('error: ', err.message);
    next(err);
  }

  const clientErrors = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
      res.send('invalid input');
    } else {
      next(err);
    }
  }

  const serverErrors = (err, req, res, next) => {
    res.sendStatus(500);
  }

  return {
    testExit,
    asyncTest,
    logErrors,
    clientErrors,
    serverErrors
  };
})();