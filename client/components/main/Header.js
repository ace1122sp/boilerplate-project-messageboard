import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => 
  <header>    
    <div className='navbar-fixed'>
      <nav className='nav-wrapper'>
        <Link className='brand-logo left' to='/'>MessageBoard - fCC</Link>
        <div className='input-field right padding'>
          <select>
            <option>general</option>
          </select>
        </div>
      </nav>
    </div>
  </header>

export default Header;