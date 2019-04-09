import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../css/Loading.scss';

const LoadingPanel = () => 
    <div className='loading-panel'>
      <span><FontAwesomeIcon icon='spinner' size='3x' className='fa-spin fa-pulse secondary-color-text' /></span>
    </div>

export default LoadingPanel;