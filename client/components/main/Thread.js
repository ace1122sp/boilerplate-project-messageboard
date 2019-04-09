import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { get, post, report, remove } from '../../libs/apiHandler';
import { reportThread } from '../../libs/commmonActionMethods';
import { threadURL, replyURL } from '../../libs/urlHandler';
import { addReplyPortal, deleteReplyPortal, deleteThreadPortal } from '../../libs/portalGenerators';

import BoardContext from '../contexts/BoardContext';
import ReplyCard from '../helper/ReplyCard';

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
      return 'thread deleted';
    } else {
      return res;
    }
  };

  const _handlePostReplyResponse = res => {
    if (res._id) {
      addToReplies(res);
      return 'reply created';
    } else {
      return 'something went wrong';
    }
  };

  const _handlePutReplyResponse = (res, reply_id) => {
    if (res === 'success') {
      setThread(() => _updateRepliesWithChangedReportedStatus(reply_id));
    }
  };

  const _handleReplyDeleteResponse = (res, data) => {
    if (res === 'success') {
      setThread(() => _markDeletedReply(data.reply_id));
      return 'reply deleted';
    } else {
      return res;
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
    return remove(threadURL(board), data)
      .then(res => _handleThreadDeleteResponse(res))
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
    return post(replyURL(board), data)
      .then(res => {
        return _handlePostReplyResponse(res);        
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
    return remove(replyURL(board), data)
      .then(res => _handleReplyDeleteResponse(res, data))
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
        _handlePutReplyResponse(res, reply_id);
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  };

  const showReplyCards = thread.replies.map(reply => <li className='collection-item card' key={reply._id}><ReplyCard thread={thread._id} reply={reply} report={reportReply} setReplyToDelete={setReplyToDelete} /></li>);

  return (
    <Fragment>
      {(threadDeleted && !threadDeletePasswordPanelOpened) && <Redirect to='/' />}
      <main className='container main main-padding'>
        {addReplyPasswordPanelOpened && addReplyPortal('Enter Reply Password', handleReplyPost, resetReply, closeReplyDeletePasswordPanel)}
        {replyToDelete && deleteReplyPortal('Enter Reply Password', handleReplyDelete, closeReplyDeletePasswordPanel)}
        {threadDeletePasswordPanelOpened && deleteThreadPortal('Enter Thread Password', handleThreadDelete, cancelThreadDelete)}
        <section className='secondary-color-bg white-text padding'>
          <h5 className=''>{thread.reported ? 'reported': thread.text}</h5>
          <hr className='hr-custom' />
          <div>
            <span className='primary-color-l-text'>{thread.created_on}</span>
            <div className='right'>
              <button className='btn-flat btn-large col s1' onClick={() => reportThread(threadURL(board), { thread_id: thread._id }, markReportedThread)}><i className='material-icons white-text'>report</i></button>
              <button className='btn-flat btn-large col s1' onClick={() => toggleThreadDeletePasswordPanel(true)}><i className='material-icons danger-text'>delete</i></button>                    
            </div>
          </div>
        </section>        
        <form className='col s12 m8 l6' onSubmit={addReply}>
          <div className='row valign-wrapper'>
            <div className='input-field col s10'>
              <input type='text' id='reply-input' value={newReply} onChange={handleReplyChange} required />
              <label htmlFor='reply-input'>reply</label>        
            </div>
            <div className='col s2'>
              <button className='btn-flat btn-large'><i className='material-icons secondary-color-text'>reply</i></button>
            </div>
          </div>
        </form>
        <section>
          <ul className='collection'>
            {showReplyCards}        
          </ul>
        </section>
      </main>
    </Fragment>
  );  
}
  
export default Thread;