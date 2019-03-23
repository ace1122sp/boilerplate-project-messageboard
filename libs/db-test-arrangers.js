const Board = require('../models/Board');
const Thread = require('../models/Thread');
const Reply = require('../models/Reply');

// create thread and update board with it 
const createThread = (done, thread) => {
  const t = new Thread(thread);
  t.save()
    .then(res => res._id)
    .then(thread => Board.findOneAndUpdate({}, { $push: { threads: thread } }))
    .then(() => {
      console.log('thread created');
      done();
    })
    .catch(err => {});
}; 

// if first param is omitted, then method should delete first thread it finds
// delete thread and remove its ref from the board
const deleteThread = (done, threadId = null) => {    
  let query = threadId ? Thread.findByIdAndDelete(threaId) : Thread.deleteOne({});

  query
    .then(() => Board.findOne())
    .then(board => {
      if (threaId) return Board.removeThread(board, threaId);
      return Board.clear(board);
    })
    .then(() => {
      console.log('thread deleted');
        done();
    })
    .catch(err => {
      console.log(err); // temp solution for development
    });
};

// create reply and add it to thread
const createReply = (done, thread_id, reply) => {
  const r = new Reply(done, reply);
  r.save()
    .then(res => res._id)
    .then(reply => Thread.addReply(thread_id, reply))
    .then(() => {
      console.log('reply created');
      done();
    })
    .catch(err => {});
};

// if reply_id is omitted, first reply being founded will be deleted
// delete reply and remove its ref from its thread
const deleteReply = (done, thread_id, reply_id = null) => {  
  let query = reply_id ? Reply.findByIdAndDelete(reply_id) : Reply.deleteOne({});

  query
    .then(() => {
      if (reply_id) return Thread.removeReply(thread_id, reply_id);
      return Thread.clear(thread_id);
    })
    .then(() => {
      console.log('thread deleted');
      done();
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = {
  createThread,
  deleteThread,
  createReply, 
  deleteReply
};