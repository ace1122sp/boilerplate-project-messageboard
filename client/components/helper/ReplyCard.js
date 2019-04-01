import React from 'react';

const ReplyCard = ({ reply }) => 
  <div>
    <button>x</button>
    <p>{reply.text}</p>
    <div>
      <p>created on: <time>{reply.created_on}</time></p>
      <button>report</button>
    </div>
  </div>

export default ReplyCard;
