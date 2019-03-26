const Board = require('../models/Board');
const Thread = require('../models/Thread');
const uuid = require('uuid/v4');

const getThreads = (req, res) => {
  const board = req.params.board;

  Board.getLastTen(board)
    .then(rec => {
      res.json(rec);
    })
    .catch(err => {
      console.error(err); // temp solution for development
    });
};

const addThread = (req, res) => {
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
      console.error(err); // temp solution for development
    });
};

const reportThread = (req, res) => {
  const _id = req.body.thread_id;

  Thread.report(_id)
    .then(() => {
      res.send('success');
    })
    .catch(err => {
      console.error(err); // temp solution for development
    });
};

const deleteThread = (req, res) => {
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
      console.error(err); // temp solution for development
    });
};

module.exports = {
  getThreads,
  addThread,
  reportThread,
  deleteThread
};