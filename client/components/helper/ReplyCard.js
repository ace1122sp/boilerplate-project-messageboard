import React, { Fragment } from 'react';

const ReplyCard = ({ thread, reply, report, setReplyToDelete }) => {
  const text = (reply.reported && reply.text !== '[deleted]') ? 'reported' : reply.text;

  return (
    <Fragment>    
      <div className='card-content'>
        <p>{text}</p>
        <p>created on: <time>{reply.created_on}</time></p>
      </div>
      <div className='card-action'>
        <button className='btn-flat waves-effect waves-teal' onClick={() => setReplyToDelete(reply._id)}><i className='material-icons'>delete</i></button>
        <button className='btn-flat waves-effect waves-teal' onClick={() => report(thread, reply._id)}><i className='material-icons'>report</i></button>
      </div>
    </Fragment>
  );
}

export default ReplyCard;
