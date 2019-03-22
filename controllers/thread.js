const Board = require('../models/Board');
const Thread = require('../models/Thread');
const uuid = require('uuid/v4');

const getThreads = (req, res) => {};

const addThread = (req, res) => {
  // validation needed
  const board = req.params.board;
  const threadParams = {
    _id: uuid(),
    text: req.body.text,
    delete_password: req.body.delete_password
  };

  const thread = new Thread(threadParams);

  thread.save()
    .then(rec => {
      return Board.add(board, rec._id)
        .then(() => rec)
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
  // to validate
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
  // need to validate
  const thread_id = req.body.thread_id;
  const delete_password = req.body.delete_password;

  Thread.deleteWithPassword(thread_id, delete_password)
    .then(status => {
      if (status) {
        res.send('success');
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