import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => 
  <footer className='page-footer footer-wrap center-align'>
    <address className='row'>created by ace11</address>
    <i>This is a demo app for learning purposes only and it's not meant for the real world usage.</i>    
    <ul className='social'>
      <li><a className='btn-floating tooltipped github-bg' data-position='top' data-tooltip='github' href='https://github.com/ace1122sp' rel='noreferrer' target='_blank'><FontAwesomeIcon icon={['fab', 'github']} /></a></li>
      <li><a className='btn-floating tooltipped linkedin-bg' data-position='top' data-tooltip='linkedin' href='https://www.linkedin.com/in/aleksandar-bulovi%C4%87-83aa74139/' rel='noreferrer' target='_blank'><FontAwesomeIcon icon={['fab', 'linkedin']} /></a></li>
      <li><a className='btn-floating tooltipped red' data-position='top' data-tooltip='portfolio' href='https://ace1122sp.github.io/portfolio/' rel='noreferrer' target='_blank'><FontAwesomeIcon icon='folder' /></a></li>
    </ul>
  </footer>

export default Footer;