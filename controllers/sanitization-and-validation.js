const { sanitizeBody } = require('express-validator/filter');
const { check, body, param, validationResult } = require('express-validator/check');
const { BOARDS } = require('../config/constants');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};

const board = param('board', 'invalid board name').isIn(BOARDS);
const threadId = check('thread_id', 'invalid thread id').isUUID(4);
const replyId = body('reply_id', 'invalid reply_id').isUUID(4);
const text = sanitizeBody('text').trim().escape();
const deletePassword = sanitizeBody('delete_password').escape();

const checkThreads = {
  get: [board],
  post: [text, deletePassword, board],
  put: [threadId, board],
  delete: [threadId, deletePassword, board]
};

const checkReplies = {
  get: [threadId, board],
  post: [text, threadId, deletePassword, board],
  put: [threadId, replyId, board],
  delete: [threadId, replyId, deletePassword, board]
};

module.exports = {
  checkThreads,
  checkReplies,
  handleValidationErrors,
};