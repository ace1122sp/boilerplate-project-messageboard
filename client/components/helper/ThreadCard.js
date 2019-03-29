import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ThreadCard = ({ thread }) => {
  const replies = thread.replies.map(reply => <li key={reply._id}>{reply.text}</li>);
  
  return (
    <div>
      <div>
        <h3><Link to={`/b/general/${thread.text}`}>{thread.text}</Link></h3>
        <ul>
          <li><button>report</button></li>
          <li><FontAwesomeIcon size='1x' icon='angle-down' /></li>
          <li>x</li>
        </ul>
      </div>
      <section>
        <ul>
          {replies}
        </ul>      
        <aside>
          <h4>{replies.length} replies</h4>
          <p>bumped on: {thread.bumped_on}</p>
        </aside>
      </section>
    </div>
  );
}
  
export default ThreadCard;