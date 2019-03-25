const Board = require('../models/Board');
const Thread = require('../models/Thread');
const Reply = require('../models/Reply');

const createBoard = (done, board) => {
  const b = new Board(board);
  b.save()
    .then(rec => {
      console.log(`board ${board.name} created`);
      done();
    })
    .catch(err => {
      console.log(err); // temp for dev
      done();
    });
};

const deleteBoard = (done, name) => {
  Board.findOneAndDelete({ name })
    .then(() => {
      console.log(`board ${name} deleted`);
      done();
    })
    .catch(err => {
      console.log(err); 
      done();
    });
};

// create thread and update board with it 
const createThread = (done, thread) => {
  const t = new Thread(thread);
  t.save()
    .then(rec => rec._id)
    .then(thread => Board.findOneAndUpdate({}, { $push: { threads: thread } }))
    .then(() => {
      console.log('thread created');
      done();
    })
    .catch(err => {
      console.log(err); // temp for dev
      done();
    });
}; 

// if first param is omitted, then method should delete first thread it finds
// delete thread and remove its ref from the board
const deleteThread = (done, threadId = null) => {    
  let query = threadId ? Thread.findByIdAndDelete(threadId) : Thread.deleteOne({});

  query
    .then(() => Board.findOne())
    .then(rec => {
      if (threadId) return Board.removeThread(rec, threadId);
      return Board.clear(rec);
    })
    .then(() => {
      console.log('thread deleted');
      done();
    })
    .catch(err => {
      console.log(err); // temp solution for development
      done();
    });
};

// create reply and add it to thread
const createReply = (done, thread_id, reply) => {
  const r = new Reply(done, reply);
  r.save()
    .then(rec => rec._id)
    .then(reply => Thread.addReply(thread_id, reply))
    .then(() => {
      console.log('reply created');
      done();
    })
    .catch(err => {
      console.log(err); // temp for dev
      done();
    });
};

// if reply_id is omitted, first reply being founded will be deleted
// delete reply and remove its ref from its thread
const deleteReply = (done, thread_id, reply_id = null) => {  
  let query = reply_id ? Reply.findByIdAndDelete(reply_id) : Reply.deleteOne({});

  query
    .then(() => {
      return Thread.clear(thread_id);
    })
    .then(() => {
      console.log('thread deleted');
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
};

module.exports = {
  createBoard,
  deleteBoard,
  createThread,
  deleteThread,
  createReply, 
  deleteReply
};