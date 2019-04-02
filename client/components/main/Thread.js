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
  const [addReplyPasswordPanelOpened, toggleAddReplyPasswordPanel] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState(null);
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
      return {...thread, replies: [...thread.replies, reply]};
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
          console.log('reply added');
          addToReplies(res);
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
    toggleAddReplyPasswordPanel(true);
  };

  const handleReplyChange = e => {
    updateNewReply(e.target.value);
  };

  const closeAddReplyPasswordPanel = () => {
    toggleAddReplyPasswordPanel(false);
  };

  const closeReplyDeletePasswordPanel = () => {
    setReplyToDelete(null);
  };

  const _markDeletedReply = reply_id => {
    const updatedReplies = thread.replies.map(reply => {
      if (reply._id === reply_id) return { ...reply, text: '[deleted]' };
      return reply;
    });
    return { ...thread, replies: updatedReplies };
  }

  const handleReplyDelete = delete_password => {
    const data = {
      thread_id: thread._id,
      reply_id: replyToDelete,
      delete_password
    };
    closeReplyDeletePasswordPanel(null);
    remove(replyURL(board), data)
      .then(res => {
        if (res === 'success') {
          console.log('reply deleted');
          setThread(() => _markDeletedReply(data.reply_id));
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  }

  const resetReply = () => {
    closeAddReplyPasswordPanel();
    updateNewReply('');
  };

  const _updateRepliesWithChangedReportedStatus = reply_id => {
    const updatedReplies = thread.replies.map(reply => {
      if (reply._id === reply_id) return { ...reply, reported: true };
      return reply;
    });

    return { ...thread, replies: updatedReplies };
  };

  const reportReply = (thread_id, reply_id) => {
    report(replyURL(board), { thread_id, reply_id })
      .then(res => {
        if (res === 'success') {
          setThread(() => _updateRepliesWithChangedReportedStatus(reply_id));
        }
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  };

  const showReplyCards = thread.replies.map(reply => <li key={reply._id}><ReplyCard thread={thread._id} reply={reply} report={reportReply} setReplyToDelete={setReplyToDelete} /></li>)

  return (
    <main>
      {addReplyPasswordPanelOpened && <PasswordPanel message='Enter Reply Password' handler={handleReplyPost} close={resetReply} />}
      {replyToDelete && <PasswordPanel message='Enter Reply Password' handler={handleReplyDelete} close={closeReplyDeletePasswordPanel} />}
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