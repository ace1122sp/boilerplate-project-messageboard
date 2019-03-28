import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons'

import Header from './Header';
import Board from './Board';
import Thread from './Thread';
import Footer from './Footer';
import NotFound from './NotFound';

library.add(fab, faFolder);

const App = () => 
  <Fragment>
    <Header />
    <Switch>
      <Route exact path='/' component={Board} />
      <Route path='/b/:board/:thread' component={Thread} />
      <Route path='/' component={NotFound} />
    </Switch>
    <Footer />
  </Fragment>

export default App;