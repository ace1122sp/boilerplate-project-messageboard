import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ThreadCard = ({ thread }) => {
  const replies = thread.replies.map(reply => <li key={reply._id}>{reply.text}</li>);
  
  return (
    <div>
      <div>
        <h3><Link to={`/b/general/${thread.text}`}>{thread.text}</Link></h3>
        <div>
          <button>report</button>
          <button><FontAwesomeIcon size='1x' icon='angle-down' /></button>
          <button>x</button>
        </div>
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