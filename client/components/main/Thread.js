import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { get, post, report, remove } from '../../libs/apiHandler';
import { threadURL, replyURL } from '../../libs/urlHandler';

import BoardContext from '../contexts/BoardContext';
import ReplyCard from '../helper/ReplyCard';
import PasswordPanel from '../helper/PasswordPanel';

const Thread = ({ match }) => {
  const board = useContext(BoardContext);
  const [thread, setThread] = useState({ replies: [] });
  const [newReply, updateNewReply] = useState('');
  const [replyPasswordPanelOpened, toggleReplyPasswordPanel] = useState(false);
  const [loading, setLoadingStatus] = useState(true);

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
  };

  const addToReplies = reply => {
    setThread(() => {
      const updatedReplies = [...thread.replies, reply];
      return {...thread, replies: [...updatedReplies]};
    });
  }

  const handleReplyPost = delete_password => {
    const data = {
      thread_id: thread._id, 
      text: newReply,
      delete_password
    };
    resetReply();
    post(replyURL(board), data)
      .then(res => {
        if (res._id) {
          addToReplies(res);
          console.log('reply added');
        } else {
          console.log('something went wrong');
        }
      })
      .catch(error => {
        console.error(err); // temp solution for development
      });
  };

  const addReply = e => {
    e.preventDefault();
    toggleReplyPasswordPanel(true);
  };

  const handleReplyChange = e => {
    updateNewReply(e.target.value);
  };

  const closeReplyPasswordPanel = () => {
    toggleReplyPasswordPanel(false);
  };

  const resetReply = () => {
    closeReplyPasswordPanel();
    updateNewReply('');
  };

  const reportReply = (thread_id, reply_id) => {
    report(replyURL(board), { thread_id, reply_id })
      .then(res => {
        if (res === 'success') {
          setThread(() => {
            const updatedReplies = thread.replies.map(reply => {
              if (reply._id === reply_id) return { ...reply, reported: true };
              return reply;
            });

            return { ...thread, replies: updatedReplies };
          });
        }
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  };

  const showReplyCards = thread.replies.map(reply => <li key={reply._id}><ReplyCard thread={thread._id} reply={reply} report={reportReply} /></li>)

  return (
    <main>
      {replyPasswordPanelOpened && <PasswordPanel message='Enter Reply Password' handler={handleReplyPost} close={resetReply} />}
      <div>
        <h2>{thread.text}</h2>
        <div>
          <button>report</button>
          <button><FontAwesomeIcon size='1x' icon='trash-alt' /></button>
        </div>        
      </div>
      <form onSubmit={addReply}>
        <input type='text' placeholder='reply' value={newReply} onChange={handleReplyChange} />
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