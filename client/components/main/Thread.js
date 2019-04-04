import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { get, post, report, remove } from '../../libs/apiHandler';
import { reportThread } from '../../libs/commmonActionMethods';
import { threadURL, replyURL } from '../../libs/urlHandler';

import BoardContext from '../contexts/BoardContext';
import ReplyCard from '../helper/ReplyCard';
import PasswordPanel from '../helper/PasswordPanel';

const Thread = ({ match }) => {
  const board = useContext(BoardContext);
  const [thread, setThread] = useState({ replies: [] });
  const [threadDeleted, setThreadAsDeleted] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [threadDeletePasswordPanelOpened, toggleThreadDeletePasswordPanel] = useState(false);
  const [addReplyPasswordPanelOpened, toggleAddReplyPasswordPanel] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState(null);
  const [loading, setLoadingStatus] = useState(true);

  useEffect(() => {
    initializeThread(replyURL(board) + `?thread_id=${match.params.thread_id}`);    
  }, []);

  const _handleGetResponse = res => {
    setThread(() => {
      return {...res};
    })
    setLoadingStatus('false');
  };

  const _handleThreadDeleteResponse = res => {
    if (res === 'success') {
      setThreadAsDeleted(true);
    } else {
      console.log(res);
    }
  };

  const _handlePostReplyResponse = res => {
    if (res._id) {
      console.log('reply added');
      addToReplies(res);
    } else {
      console.log('something went wrong');
    }
  };

  const _handlePutReplyResponse = res => {
    if (res === 'success') {
      setThread(() => _updateRepliesWithChangedReportedStatus(reply_id));
    }
  };

  const _handleReplyDeleteResponse = (res, data) => {
    if (res === 'success') {
      console.log('reply deleted');
      setThread(() => _markDeletedReply(data.reply_id));
    } else {
      console.log(res);
    }
  };

  const _markDeletedReply = reply_id => {
    const updatedReplies = thread.replies.map(reply => {
      if (reply._id === reply_id) return { ...reply, text: '[deleted]' };
      return reply;
    });
    return { ...thread, replies: updatedReplies };
  };
  
  const _updateRepliesWithChangedReportedStatus = reply_id => {    
    const updatedReplies = thread.replies.map(reply => {
      
      // find the newly reported reply and check if it has not been deleted before you can update 'reported' field
      if (reply._id === reply_id && reply.text !== '[deleted]') return { ...reply, reported: true };
      return reply;
    });

    return { ...thread, replies: updatedReplies };
  };

  const initializeThread = url => {
    get(url)
      .then(res => {
        _handleGetResponse(res);
      })
      .catch(err => {
        console.error(err); // temp solution
      });
  };

  const markReportedThread = () => {
    setThread(() => {
      return { ...thread, reported: true };
    });
  };

  const handleThreadDelete = delete_password => {
    const data = { thread_id: thread._id, delete_password };
    toggleThreadDeletePasswordPanel(false);
    remove(threadURL(board), data)
      .then(res => {
        _handleThreadDeleteResponse(res);
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  };

  const cancelThreadDelete = () => {
    toggleThreadDeletePasswordPanel(false);
  }

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
        _handlePostReplyResponse(res);
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
    setNewReply(e.target.value);
  };

  const closeAddReplyPasswordPanel = () => {
    toggleAddReplyPasswordPanel(false);
  };

  const closeReplyDeletePasswordPanel = () => {
    setReplyToDelete(null);
  };

  const handleReplyDelete = delete_password => {
    const data = {
      thread_id: thread._id,
      reply_id: replyToDelete,
      delete_password
    };
    closeReplyDeletePasswordPanel(null);
    remove(replyURL(board), data)
      .then(res => {
        _handleReplyDeleteResponse(res, data);
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  }

  const resetReply = () => {
    closeAddReplyPasswordPanel();
    setNewReply('');
  };

  const reportReply = (thread_id, reply_id) => {
    report(replyURL(board), { thread_id, reply_id })
      .then(res => {
        _handlePutReplyResponse(res);
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  };

  const showReplyCards = thread.replies.map(reply => <li key={reply._id}><ReplyCard thread={thread._id} reply={reply} report={reportReply} setReplyToDelete={setReplyToDelete} /></li>)

  return (
    <Fragment>
      {threadDeleted && <Redirect to='/' />}
      <main>
        {addReplyPasswordPanelOpened && <PasswordPanel message='Enter Reply Password' handler={handleReplyPost} close={resetReply} />}
        {replyToDelete && <PasswordPanel message='Enter Reply Password' handler={handleReplyDelete} close={closeReplyDeletePasswordPanel} />}
        {threadDeletePasswordPanelOpened && <PasswordPanel message='Enter Thread Password' handler={handleThreadDelete} close={cancelThreadDelete} />}
        <div>
          <h2>{thread.reported ? 'reported': thread.text}</h2>
          <div>
            <button onClick={() => reportThread(threadURL(board), { thread_id: thread._id }, markReportedThread)}>report</button>
            <button onClick={() => toggleThreadDeletePasswordPanel(true)}><FontAwesomeIcon size='1x' icon='trash-alt' /></button>
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
    </Fragment>
  );  
};
  
export default Thread;