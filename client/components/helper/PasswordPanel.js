import React, { useState } from 'react';

import Notification from './Notification';

const PasswordPanel = ({ message, handler, close }) => {
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);

  const handleChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handler(password)
      .then(res => {
        setResponse(res);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className='portal-overlay'>
      <div className='portal'>    
        <div className='portal-content'>
          <button className='btn' onClick={close}>
            <i className='material-icons'>close</i>
          </button>
          {(response && <Notification notification={response} />) || 
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='input-field col offset-s3 s6'>
                <input type='password' id='password-input' value={password} onChange={handleChange} required />
                <label htmlFor='password-input'>{message}</label>
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
  
export default PasswordPanel;