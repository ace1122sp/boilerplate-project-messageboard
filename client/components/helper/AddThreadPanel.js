import React, { useState, useContext } from 'react';

import { post } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';

import BoardContext from '../contexts/BoardContext';

const AddThreadPanel = ({ close, addToThreads }) => {
  const board = useContext(BoardContext);
  const [sending, updateRequestStatus] = useState(false);
  const [notification, setNotification] = useState(null);
  const [thread, updateThread] = useState('');
  const [delete_password, updatePassword] = useState('');

  const addThread = e => {
    e.preventDefault();
    updateRequestStatus(true);
    post(threadURL(board), { text: thread, delete_password })
      .then(res => {
        if (res._id) {
          addToThreads(res);
          setNotification('Thread added successfully!');
        } else {
          setNotification('Something went wrong!');
        }
        updateRequestStatus(false);
      })
      .catch(err => {});
  };

  const handleThreadChange = e => {
    updateThread(e.target.value);
  };

  const handlePasswordChange = e => {
    updatePassword(e.target.value);
  };

  const showForm = () => 
    <form onSubmit={addThread}>
      <label>New Thread</label>
      <input type='text' placeholder='thread' value={thread} onChange={handleThreadChange} />
      <label>password</label>
      <input type='password' placeholder='password' value={delete_password} onChange={handlePasswordChange} /> 
      <button>submit</button>
    </form>

  const showNotification = () => 
    <h3>{notification}</h3>

  return (
    <div>
      <button onClick={close}>x</button>
      {(!notification && showForm()) || showNotification()}
    </div>
  );
}

export default AddThreadPanel;
