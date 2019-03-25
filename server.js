'use strict';
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const dbConnect = require('./libs/db');
const { sendIndexHTML, notFound, redirectToCompressedStaticJS } = require('./controllers/general');
 
const PORT = config.app.port || 3000;

const app = express();

// connect to db
dbConnect(config.db.mongoURI);

// set headers
app.use(cors({origin: '*'})); //For FCC testing purposes only
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use((req, res, next) => {
  res.set({
    'Content-Security-Policy': "default-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self'; base-uri 'none'"
  });
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// add gzip config
app.get('*', redirectToCompressedStaticJS);

// serve static files
app.use('/public', express.static(process.cwd() + '/public'));

//Routing for API 
apiRoutes(app);

//Index page (static HTML)
app.route('/*')
  .get(sendIndexHTML);

//For FCC testing purposes
fccTestingRoutes(app);
    
//404 Not Found Middleware
app.use(notFound);

//Start our server and tests!
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
  if(process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(err) {        
        console.log('Tests are not valid:');
        console.log(err);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
