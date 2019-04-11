import React, { Fragment } from 'react';

const Notification = ({ notification }) => 
  <Fragment>
    <h5 className='center custom-margin-top-bottom'>{notification}</h5>
  </Fragment>

export default Notification;