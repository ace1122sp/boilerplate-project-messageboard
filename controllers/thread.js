const uuid = require('uuid/v4');
const validator = require('validator');

const Board = require('../models/Board');
const Thread = require('../models/Thread');

const getThreads = (req, res, next) => {
  const board = req.params.board;
  const offset = req.query.offset || null;

  Board.getTen(board, offset)
    .then(rec => {     
      const unescapedThreads = rec.threads.map(thread => {
        thread.text = validator.unescape(thread.text);
        thread.replies.forEach(reply => {
          if (reply) {
            if (reply.reported) reply.text = 'reported';
            reply.text = validator.unescape(reply.text);
          }

          return reply;
        });
        return thread;
      });      

      res.json(unescapedThreads);
    })
    .catch(err => {
      next(err);
    });
};

const addThread = (req, res, next) => {
  const board = req.params.board;
  const threadParams = {
    _id: uuid(),
    text: req.body.text,
    delete_password: req.body.delete_password
  };

  const thread = new Thread(threadParams);

  thread.save()
    .then(rec => {
      return Board.addThread(board, rec._id)
        .then(() => {
          return Object.assign({
            _id: rec._id,
            text: rec.text,
            created_on: rec.created_on,
            bumped_on: rec.bumped_on,
            reported: rec.reported,
            replies: rec.replies
          });
        })
        .catch(err => err);
    })
    .then(rec => {
      res.status(200).json(rec);
    })
    .catch(err => {
      next(err);
    });
};

const reportThread = (req, res, next) => {
  const _id = req.body.thread_id;

  Thread.report(_id)
    .then(() => {
      res.send('success');
    })
    .catch(err => {
      next(err);
    });
};

const deleteThread = (req, res, next) => {
  const board = req.params.board;
  const thread_id = req.body.thread_id;
  const delete_password = req.body.delete_password;

  Thread.deleteWithPassword(thread_id, delete_password)
    .then(status => {
      if (status) {
        Board.removeThread(board, thread_id)
          .then(() => {
            res.send('success');          
          })
          .catch(err => err);
      } else {
        res.send('incorrect password');
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getThreads,
  addThread,
  reportThread,
  deleteThread
};