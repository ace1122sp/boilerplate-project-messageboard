import React from 'react';

const ReplyCard = ({ reply }) => 
  <div>
    <button>x</button>
    <p>{reply.text}</p>
    <div>
      <time>## ##</time>
      <button>report</button>
    </div>
  </div>

export default ReplyCard;
