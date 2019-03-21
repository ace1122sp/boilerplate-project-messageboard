// create thread and update board with it 
const createThread = (done, thread) => {}; 

// if first param is omitted, then method should delete first thread it finds
// delete thread and remove its ref from the board
const deleteThread = (done, threadId = null) => {};

// create reply and add it to thread
const createReply = (done, thread_id, reply) => {};

const deleteReply = (done, thread_id, reply_id = null) => {};

module.exports = {
  createThread,
  deleteThread,
  createReply, 
  deleteReply
};