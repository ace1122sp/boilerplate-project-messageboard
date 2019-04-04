import React, { useState, useContext } from 'react';

import { post } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';

import BoardContext from '../contexts/BoardContext';

import Notification from './_addThreadPanel/Notification';

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
    <div>
      <button onClick={close}>x</button>
      {(notification && <Notification notification={notification} />) ||
      <form onSubmit={addThread}>
        <label>New Thread</label>
        <input type='text' placeholder='thread' value={thread} onChange={handleThreadChange} />
        <label>password</label>
        <input type='password' placeholder='password' value={delete_password} onChange={handlePasswordChange} /> 
        <button>submit</button>
      </form>}
    </div>
  );
}

export default AddThreadPanel;
