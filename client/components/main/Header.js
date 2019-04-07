import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => 
  <header className='row valign-wrapper'>
    <h1 className='col s12 offset-m1 m7'>
      <Link to='/'>MessageBoard - fCC</Link>
    </h1>
    <div className='row input-field right'>
      <select>
        <option>general</option>
      </select>
    </div>
  </header>

export default Header;