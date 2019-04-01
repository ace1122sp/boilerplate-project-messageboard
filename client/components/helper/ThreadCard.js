import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { report } from '../../libs/apiHandler';

import { Link } from 'react-router-dom';

const ThreadCard = ({ thread, apiUrl }) => {
  const replies = thread.replies.map(reply => <li key={reply._id}>{reply.text}</li>);
  const [text, updateThreadText] = useState(() => thread.reported ? 'reported' : <Link to={`/b/general/${thread._id}`}>{thread.text}</Link>);
  
  const reportThread = () => {    
    report(apiUrl, { thread_id: thread._id })
      .then(res => {
        if (res === 'success') {
          updateThreadText('reported');
        }
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  };
  
  return (
    <div>
      <div>
        <h3>{text}</h3>
        <div>
          <button onClick={reportThread}>report</button>
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