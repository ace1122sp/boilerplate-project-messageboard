import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faPlus, faTrashAlt, faEyeSlash, faHouseDamage, faFolder, faSpinner } from '@fortawesome/free-solid-svg-icons'

import Header from './Header';
import Board from './Board';
import Thread from './Thread';
import Footer from './Footer';
import NotFound from './NotFound';

library.add(fab, faAngleDown, faPlus, faTrashAlt, faEyeSlash, faHouseDamage, faFolder, faSpinner);

import '../../css/App.scss';
import M from "materialize-css";

const App = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={Board} />
        <Route path='/b/:board/:thread_id' render={props => <Thread {...props} />} />
        <Route path='/' component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  ); 
}
  
export default App;