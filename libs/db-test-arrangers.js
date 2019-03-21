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
  const _removeThreadFromBoard = (board, thread) => {
    let updatedThreads = board.threads.filter(t => t !== thread)
    board.threads = [...updatedThreads];
    return board.save();
  };

  const _clearThreadsInBoard = board => {
    board.threads = [];
    return board.save();
  };
  
  let query = threadId ? Thread.findByIdAndDelete(threaId) : Thread.deleteOne({});

  query
    .then(() => Board.findOne())
    .then(board => {
      if (threaId) return _removeThreadFromBoard(board, threaId);
      return _clearThreadsInBoard(board);
    })
    .then(() => {
      console.log('thread deleted');
        done();
    })
    .catch(err => {});
};

// create reply and add it to thread
const createReply = (done, thread_id, reply) => {
  const r = new Reply(done, reply);
  r.save()
    .then(res => res._id)
    .then(reply => Thread.findByIdAndUpdate(thread_id, { $push: { replies: reply } }))
    .then(() => {
      console.log('reply created');
      done();
    })
    .catch(err => {});
};

// if reply_id is omitted, first reply being founded will be deleted
// delete reply and remove its ref from its thread
const deleteReply = (done, thread_id, reply_id = null) => {
  const _removeReplyFromThread = (reply, thread) => {
    let updatedReplies = thread.replies.filter(r => r !== reply);
    thread.replies = [...updatedReplies];
    return thread.save();
  }; 

  const _clearRepliesInThread = thread => {
    thread.replies = [];
    return thread.save();
  };

  let query = reply_id ? Reply.findByIdAndDelete(reply_id) : Reply.deleteOne({});

  query
    .then(() => Thread.findById(thread_id))
    .then(thread => {
      if (reply_id) return _removeReplyFromThread(reply_id, thread);
      return _clearRepliesInThread(thread);
    })
    .then(() => {
      console.log('thread deleted');
      done();
    })
    .catch(err => {});
};

module.exports = {
  createThread,
  deleteThread,
  createReply, 
  deleteReply
};