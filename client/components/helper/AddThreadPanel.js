import React, { useState, useContext } from 'react';

import { post } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';
import { showOnlyLoadingIf, showOnlyNotificationIf } from '../../libs/renderers';

import BoardContext from '../contexts/BoardContext';
import SubmitBtn_ from '../private/SubmitBtn_';
import PasswordInput_ from '../private/PasswordInput_';
import CloseBtn_ from '../private/CloseBtn_';
import Portal_ from '../private/Portal_';

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
    <Portal_>
      <CloseBtn_ close={close} />
      {showOnlyLoadingIf(loading) || (showOnlyNotificationIf(notification) ||
      <form onSubmit={addThread}>
        <div className='row custom-margin-top-bottom'>
          <div className='input-field col s12 offset-m3 m6'>
            <input type='text' id='thread-input' value={thread} onChange={handleThreadChange} required />
            <label htmlFor='thread-input'>new thread</label>
          </div>
        </div>
        <PasswordInput_  value={delete_password} changeFunction={handlePasswordChange} label='password' />
        <SubmitBtn_ />
      </form>)}
    </Portal_>
  );
}

export default AddThreadPanel;
