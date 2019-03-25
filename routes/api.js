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
const { checkThreads, checkReplies, handleValidationErrors } = require('../controllers/sanitization-and-validation');

module.exports = function (app) {  
  app.route('/api/threads/:board')
    .get(checkThreads.get, handleValidationErrors, getThreads)
    .post(checkThreads.post, handleValidationErrors, addThread)
    .put(checkThreads.put, handleValidationErrors, reportThread)
    .delete(checkThreads.delete, handleValidationErrors, deleteThread);
    
  app.route('/api/replies/:board')
    .get(checkReplies.get, handleValidationErrors, getThread)
    .post(checkReplies.post, handleValidationErrors, addReply)
    .put(checkReplies.put, handleValidationErrors, reportReply)
    .delete(checkReplies.delete, handleValidationErrors, deleteReply);
};
