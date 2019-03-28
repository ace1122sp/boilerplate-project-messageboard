import React from 'react';

const ReplyCard = ({ reply }) => 
  <div>
    <button>x</button>
    <p>{reply.text}</p>
    <div>
      <p>created on: <time>## ##</time></p>
      <button>report</button>
    </div>
  </div>

export default ReplyCard;
