import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReplyCard from '../helper/ReplyCard';

// delete this
const fakeReply = {
  _id: '11',
  text: 'fake reply',
  created_on: '33:11',
  reported: false,
  delete_password: '12345'
};

const Thread = () => 
  <main>
    <div>
      <h2>Thread name</h2>
      <div>
        <button>report</button>
        <button><FontAwesomeIcon size='1x' icon='trash-alt' /></button>
      </div>        
    </div>
    <form>
      <input type='text' placeholder='reply' />
      <button>add reply</button>
    </form>
    <section>
      <ul>
        <li><ReplyCard reply={fakeReply} /></li>
      </ul>
    </section>
  </main>

export default Thread;