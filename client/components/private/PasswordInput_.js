import React from 'react';

const PasswordInput_ = ({ value, changeFunction, label }) => 
  <div className='row custom-margin-top-bottom'>
    <div className='input-field col s12 offset-m3 m6'>
      <input type='password' id='password-input' value={value} onChange={changeFunction} required /> 
      <label htmlFor='password-input'>{label}</label>
      <span className='helper-text'>password must be at least 5 characters long</span>
    </div>
  </div>

export default PasswordInput_;