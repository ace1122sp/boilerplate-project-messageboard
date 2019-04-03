import React from 'react';

const ReplyCard = ({ thread, reply, report, setReplyToDelete }) => 
  <div>    
    <button onClick={() => setReplyToDelete(reply._id)}>x</button>
    <p>{(reply.reported && reply.text !== '[deleted]') ? 'reported' : reply.text}</p>
    <div>
      <p>created on: <time>{reply.created_on}</time></p>
      <button onClick={() => report(thread, reply._id)}>report</button>
    </div>
  </div>

export default ReplyCard;
