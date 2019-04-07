import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <li >
      <div className='collapsible-header valign-wrapper space-between'>
        <span className='truncate'>{text}</span>        
        <i className='material-icons right'>keyboard_arrow_down</i>
      </div>
      <div className='collapsible-body'>
        <div className='row'>
          <ul>
            {replies}
          </ul>      
          <aside>
            <span>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>
            <p>bumped on: {thread.bumped_on}</p>
          </aside>
        </div>
        <div className='row right-align'>
          <button className='btn-flat waves-effect waves-teal' onClick={() => reportThread(apiUrl, { thread_id: thread._id }, markReportedThread)}><i className='material-icons'>report</i></button>
          <button className='btn-flat waves-effect waves-teal' onClick={deleteThread}><i className='material-icons'>delete</i></button>        
        </div>        
      </div>
    </li>              
  );
};
  
export default ThreadCard;