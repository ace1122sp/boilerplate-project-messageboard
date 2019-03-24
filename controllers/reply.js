const uuid = require('uuid/v4');
const Thread = require('../models/Thread');
const Reply = require('../models/Reply');

const getThread = (req, res) => {
  // to validate 
  const thread_id = req.query.thread_id;

  Thread.get(thread_id)
    .then(rec => {
      res.json(rec);
    })
    .catch(err => {
      console.error(err); // temp solution for development
    });
};

const addReply = (req, res) => {
  // validation needed
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

const reportReply = (req, res) => {
  // to validate
  const thread_id = req.body.thread_id; // atm i dont need this
  const reply_id = req.body.reply_id;

  Reply.report(reply_id)
    .then(() => {
      res.send('success')
    })
    .catch(err => {
      console.error(err); // temp solution for development
    });
};

const deleteReply = (req, res) => {
  // need to validate
  const board = req.params.board;
  const thread_id = req.params.thread_id;
  const reply_id = req.params.reply_id;
  const delete_password = req.params.delete_password;

  Reply.deleteWithPassword(reply_id, delete_password)
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
  getThread,
  addReply,
  reportReply,
  deleteReply
};