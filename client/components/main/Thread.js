import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { get, post, report, remove } from '../../libs/apiHandler';
import { threadURL, replyURL } from '../../libs/urlHandler';

import BoardContext from '../contexts/BoardContext';
import ReplyCard from '../helper/ReplyCard';

const Thread = ({ match }) => {
  const board = useContext(BoardContext);
  const [thread, setThread] = useState({ replies: [] });
  const [loading, setLoadingStatus] = useState(true);

  const showReplyCards = thread.replies.map(reply => <li key={reply._id}><ReplyCard reply={reply} /></li>)

  useEffect(() => {
    initializeThread(replyURL(board) + `?thread_id=${match.params.thread_id}`);    
  }, []);

  const initializeThread = url => {
    get(url)
      .then(res => {
        setThread(() => {
          return {...res};
        })
        setLoadingStatus('false');
      })
      .catch(err => {
        console.error(err); // temp solution
      });
  }

  return (
    <main>
      <div>
        <h2>{thread.text}</h2>
        <div>
          <button>report</button>
          <button><FontAwesomeIcon size='1x' icon='trash-alt' /></button>
        </div>        
      </div>
      <form>
        <input type='text' placeholder='reply' />
        <button>add reply</button>
      </form>
      <section>
        <ul>
          {showReplyCards}        
        </ul>
      </section>
    </main>
  );
};
  
export default Thread;