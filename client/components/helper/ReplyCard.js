import React from 'react';

const ReplyCard = ({ thread, reply, report }) => 
  <div>    
    <button>x</button>
    <p>{reply.reported ? 'reported' : reply.text}</p>
    <div>
      <p>created on: <time>{reply.created_on}</time></p>
      <button onClick={() => report(thread, reply._id)}>report</button>
    </div>
  </div>

export default ReplyCard;
