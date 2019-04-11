import React, { useState, useContext } from 'react';

import { post } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';
import { showOnlyLoadingIf, showOnlyNotificationIf } from '../../libs/renderers';

import BoardContext from '../contexts/BoardContext';

const AddThreadPanel = ({ close, addToThreads }) => {
  const board = useContext(BoardContext);
  const [loading, setLoadingStatus] = useState(false);
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
    setLoadingStatus(false);
  };

  const addThread = e => {
    e.preventDefault();
    setLoadingStatus(true);
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
          {showOnlyLoadingIf(loading) || (showOnlyNotificationIf(notification) ||
          <form className='margin-up-and-down' onSubmit={addThread}>
            <div className='row'>
              <div className='input-field col s12 offset-m3 m6'>
                <input type='text' id='thread-input' value={thread} onChange={handleThreadChange} required />
                <label htmlFor='thread-input'>new thread</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 offset-m3 m6'>
                <input type='password' id='password-input' value={delete_password} onChange={handlePasswordChange} required /> 
                <label htmlFor='password-input'>password</label>
                <span className='helper-text'>password must be at least 5 characters long</span>
              </div>
            </div>
            <div className='row'>
              <button className='col btn right'>
                <span className='col s8 center'>submit</span>
                <i className='col s4 material-icons'>send</i>
              </button>
            </div>
          </form>)}
        </div>
      </div>
    </div>
  );
}

export default AddThreadPanel;
