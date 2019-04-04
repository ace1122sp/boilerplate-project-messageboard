import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { reportThread } from '../../libs/commmonActionMethods';

const ThreadCard = ({ thread, apiUrl, setThreadToDelete }) => {
  const [text, setThreadText] = useState(() => thread.reported ? 'reported' : <Link to={`/b/general/${thread._id}`}>{thread.text}</Link>);

  const markReportedThread = () => {
    setThreadText('reported');
  };

  const deleteThread = () => {
    setThreadToDelete(thread._id);
  };

  const replies = thread.replies.map(reply => <li key={reply._id}>{thread.reported ? '*****' : reply.text}</li>);

  return (
    <div>
      <div>
        <h3>{text}</h3>
        <div>
          <button onClick={() => reportThread(apiUrl, { thread_id: thread._id }, markReportedThread)}>report</button>
          <button><FontAwesomeIcon size='1x' icon='angle-down' /></button>
          <button onClick={deleteThread}>x</button>
        </div>
      </div>
      <section>
        <ul>
          {replies}
        </ul>      
        <aside>
          <h4>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</h4>
          <p>bumped on: {thread.bumped_on}</p>
        </aside>
      </section>
    </div>
  );
};
  
export default ThreadCard;