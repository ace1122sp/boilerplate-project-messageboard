import React, { Fragment } from 'react';

const Notification = ({ notification }) => 
  <Fragment>
    <h3 className='center'>{notification}</h3>
  </Fragment>

export default Notification;