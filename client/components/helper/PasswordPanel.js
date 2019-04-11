import React, { useState } from 'react';

import { showOnlyLoadingIf, showOnlyNotificationIf } from '../../libs/renderers';
import SubmitBtn_ from '../private/SubmitBtn_';
import PasswordInput_ from '../private/PasswordInput_';
import CloseBtn_ from '../private/CloseBtn_';
import Portal_ from '../private/Portal_';

const PasswordPanel = ({ message, handler, close }) => {
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [loading, setLoadingStatus] = useState(false);

  const handleChange = e => {
    setPassword(e.target.value);
  };

  const _handleResponse = res => {
    setNotification(res);
    setLoadingStatus(false);    
  }

  const send = e => {
    e.preventDefault();
    setLoadingStatus(true);
    handler(password)
      .then(res => {
        _handleResponse(res);
      })
      .catch(err => {
        _handleResponse('something went wrong')
      });
  };

  return (    
    <Portal_>
      <CloseBtn_ close={close} />
      {showOnlyLoadingIf(loading) || (showOnlyNotificationIf(notification) || 
      <form onSubmit={send}>            
        <PasswordInput_ value={password} changeFunction={handleChange} label={message} />
        <SubmitBtn_ />
      </form>)}
    </Portal_>
  );
}
  
export default PasswordPanel;