import React from 'react';

const CloseBtn_ = ({ close }) => 
  <button className='btn' onClick={close}>
    <i className='material-icons'>close</i>
  </button>

export default CloseBtn_;