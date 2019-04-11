import React from 'react';

const Portal_ = props => 
<div className='portal-overlay'>
  <div className='portal'>    
    <div className='portal-content'>
      {props.children}
    </div>
  </div>
</div>

export default Portal_;