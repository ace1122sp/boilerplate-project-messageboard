module.exports = (() => {
  const testExit = err => {
    console.error(err);
    process.exit(1);
  }

  const asyncTest = (err, done) => {
    console.error(err);
    done();
  }
  
  const logErrors = (err, req, res, next) => {
    console.error(err);
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
  }
})();