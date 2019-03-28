import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Thread = () => 
  <main>
    <div>
      <h2>Thread name</h2>
      <div>
        <button>report</button>
        <button><FontAwesomeIcon size='1x' icon='trash-alt' /></button>
      </div>        
    </div>
    <section>
      <ul>
        <li>reply 1</li>
        <li>reply 1</li>
        <li>reply 1</li>
      </ul>
    </section>
  </main>

export default Thread;