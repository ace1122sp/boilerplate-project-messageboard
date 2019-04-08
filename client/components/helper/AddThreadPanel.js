import React, { useState, useContext } from 'react';

import { post } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';

import BoardContext from '../contexts/BoardContext';

import Notification from './Notification';

const AddThreadPanel = ({ close, addToThreads }) => {
  const board = useContext(BoardContext);
  const [sending, setRequestStatus] = useState(false);
  const [notification, setNotification] = useState(null);
  const [thread, setThread] = useState('');
  const [delete_password, setPassword] = useState('');

  const _handlePostResponse = res => {
    if (res._id) {
      addToThreads(res);
      setNotification('Thread added successfully!');
    } else {
      setNotification('Something went wrong!');
    }
    setRequestStatus(false);
  };

  const addThread = e => {
    e.preventDefault();
    setRequestStatus(true);
    post(threadURL(board), { text: thread, delete_password })
      .then(res => {
        _handlePostResponse(res);
      })
      .catch(err => {});
  };

  const handleThreadChange = e => {
    setThread(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  return (
    <div className='portal-overlay'>
      <div className='portal'>    
        <div className='portal-content'>
          <button className='btn' onClick={close}>
            <i className='material-icons'>close</i>
          </button>
          {(notification && <Notification notification={notification} />) ||
          <form onSubmit={addThread}>
            <div className='row'>
              <div className='input-field col offset-s3 s6'>
                <input type='text' id='thread-input' value={thread} onChange={handleThreadChange} />
                <label htmlFor='thread-input'>new thread</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col offset-s3 s6'>
                <input type='password' id='password-input' value={delete_password} onChange={handlePasswordChange} /> 
                <label htmlFor='password-input'>password</label>
                <span className='helper-text'>password must be at least 5 characters long</span>
              </div>
            </div>
            <div className='row'>
              <button className='btn col offset-s10'>submit
                <i className='material-icons'>send</i>
              </button>
            </div>
          </form>}
        </div>
      </div>
    </div>
  );
}

export default AddThreadPanel;
