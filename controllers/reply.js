const uuid = require('uuid/v4');
const Thread = require('../models/Thread');
const Reply = require('../models/Reply');

const getThread = (req, res, next) => {
  const thread_id = req.query.thread_id;

  Thread.get(thread_id)
    .then(rec => {
      res.json(rec);
    })
    .catch(err => {
      next(err);
    });
};

const addReply = (req, res, next) => {
  const board = req.params.board;
  const thread_id = req.body.thread_id;
  const replyParams = {
    _id: uuid(),
    text: req.body.text,
    delete_password: req.body.delete_password,
  };

  const reply = new Reply(replyParams);

  reply.save()
    .then(rec => {
      return Thread.addReply(thread_id, rec._id)
        .then(() => {
          return Object.assign({
            _id: rec._id,
            text: rec.text,
            created_on: rec.created_on,
            reported: rec.reported
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

const reportReply = (req, res, next) => {
  const thread_id = req.body.thread_id; // atm i dont need this
  const reply_id = req.body.reply_id;

  Reply.report(reply_id)
    .then(() => {
      res.send('success')
    })
    .catch(err => {
      next(err);
    });
};

const deleteReply = (req, res, next) => {
  const board = req.params.board;
  const thread_id = req.params.thread_id;
  const reply_id = req.body.reply_id;
  const delete_password = req.body.delete_password;

  Reply.deleteWithPassword(reply_id, delete_password)
    .then(status => {
      if (status) {
        res.send('success');
      } else {
        res.send('incorrect password');
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getThread,
  addReply,
  reportReply,
  deleteReply
};