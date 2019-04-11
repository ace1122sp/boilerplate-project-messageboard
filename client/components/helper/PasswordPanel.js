import React, { useState } from 'react';

import { showOnlyLoadingIf, showOnlyNotificationIf } from '../../libs/renderers';
import SubmitBtn_ from '../private/SubmitBtn_';
import PasswordInput_ from '../private/PasswordInput_';
import CloseBtn_ from '../private/CloseBtn_';
import Portal_ from '../private/Portal_';

const PasswordPanel = ({ message, handler, close }) => {
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoadingStatus] = useState(false);

  const handleChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoadingStatus(true);
    handler(password)
      .then(res => {
        setResponse(res);
        setLoadingStatus(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (    
    <Portal_>
      <CloseBtn_ close={close} />
      {showOnlyLoadingIf(loading) || (showOnlyNotificationIf(response) || 
      <form onSubmit={handleSubmit}>            
        <PasswordInput_ value={password} changeFunction={handleChange} label={message} />
        <SubmitBtn_ />
      </form>)}
    </Portal_>
  );
}
  
export default PasswordPanel;