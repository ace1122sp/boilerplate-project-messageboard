import React, { useState } from 'react';

const PasswordPanel = ({ message, handler, close }) => {
  const [password, updatePassword] = useState('');

  const handleChange = e => {
    updatePassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handler(password);
  };

  return (
    <div>
      <button onClick={close}>x</button>
      <form onSubmit={handleSubmit}>
        <label>{message}</label>
        <input type='password' placeholder='password' value={password} onChange={handleChange} />
        <button>submit</button>
      </form>
    </div>
  );
};
  
export default PasswordPanel;