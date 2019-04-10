import React from 'react';

const ReplyCard = ({ thread, reply, report, setReplyToDelete }) => {
  const text = (reply.reported && reply.text !== '[deleted]') ? 'reported' : reply.text;
  let classesString = 'btn-flat waves-effect waves-teal';  

  if (reply.text === '[deleted]') classesString += ' disabled';

  return (
    <div className='row'>    
      <div className='col s12 m10 xl6'>    
        <div className='card'>
          <div className='card-content'>
            <p>{text}</p>
          </div>
          <div className='card-action'>
            <p className='disabled-color-text'>created on: <time>{reply.created_on}</time></p>
            <button className={classesString} onClick={() => report(thread, reply._id)}><i className='material-icons'>report</i></button>
            <button className={classesString} onClick={() => setReplyToDelete(reply._id)}><i className='material-icons danger-text'>delete</i></button>
          </div>
        </div>
      </div>
    </div>    
  );
}

export default ReplyCard;
