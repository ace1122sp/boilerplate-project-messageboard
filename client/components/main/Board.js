import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ThreadCard from '../helper/ThreadCard';

// delete this
const fakeThread = {
  _id: '00',
  text: 'Fake Thread',
  created_on: '11:22',
  bumped_on: '11:22',
  reported: false,
  delete_password: '12345',
  replies: []
};

const Board = () => 
  <main>
    <div>
      <button><FontAwesomeIcon size='1x' icon='plus' />add thread</button>
    </div>
    <section>
      <ul>
        <li><ThreadCard thread={fakeThread} /></li>
      </ul>
    </section>
  </main>

export default Board;