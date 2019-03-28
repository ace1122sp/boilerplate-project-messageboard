import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Board = () => 
  <main>
    <div>
      <button><FontAwesomeIcon size='1x' icon='plus' />add thread</button>
    </div>
    <section>
      <ul>
        <Link to='/b/general/earth'>earth</Link>
        <Link to='/b/general/mars'>mars</Link>
        <Link to='/b/general/jupiter'>jupiter</Link>
      </ul>
    </section>
  </main>

export default Board;