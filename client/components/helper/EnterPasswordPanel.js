import React from 'react';

const EnterPasswordPanel = ({ message }) => 
  <div>
    <button>x</button>
    <form>
      <label>{message}</label>
      <input type='text' placeholder='password' />
      <button>submit</button>
    </form>
  </div>

export default EnterPasswordPanel;