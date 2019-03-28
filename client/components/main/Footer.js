import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => 
  <footer>
    <address>created by ace11</address>
    <i>This is a demo app for learning purposes only and it's not meant for the real world usage.</i>
    <ul>
      <li><a href='https://github.com/ace1122sp' rel='noreferrer' target='_blank'><FontAwesomeIcon icon={['fab', 'github']} /> github | </a></li>
      <li><a href='https://www.linkedin.com/in/aleksandar-bulovi%C4%87-83aa74139/' rel='noreferrer' target='_blank'><FontAwesomeIcon icon={['fab', 'linkedin']} /> linkedin | </a></li>
      <li><a href='https://ace1122sp.github.io/portfolio/' rel='noreferrer' target='_blank'><FontAwesomeIcon icon='folder' /> portfolio </a></li>
    </ul>
  </footer>

export default Footer;