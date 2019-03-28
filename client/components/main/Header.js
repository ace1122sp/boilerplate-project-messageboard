import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => 
  <header>
    <h1>
      <Link to='/'>MessageBoard - fCC</Link>
    </h1>
    <div>
      <span>board: </span>
      <select>
        <option>general</option>
      </select>
    </div>
  </header>

export default Header;