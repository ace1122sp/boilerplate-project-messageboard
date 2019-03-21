/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const { getThreads, addThread, reportThread, deleteThread } = require('../controllers/thread');
const { getThread, addReply, reportReply, deleteReply } = require('../controllers/reply');

module.exports = function (app) {  
  app.route('/api/threads/:board')
    .get(getThreads)
    .post(addThread)
    .put(reportThread)
    .delete(deleteThread);
    
  app.route('/api/replies/:board')
    .get(getThread)
    .post(addReply)
    .put(reportReply)
    .delete(deleteReply);
};
