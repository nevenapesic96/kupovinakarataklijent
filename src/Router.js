import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from "./components/Login";
import Main from "./components/Main"; 
import PrikazLetova from "./components/PrikazLetova";
import PrikazPutnika from './components/PrikazPutnika';
import Putnik from './components/Putnik';
import Let from './components/Let';
import Letovi from './components/Letovi';
import AdminMain from './components/AdminMain';

class Router extends Component {

  render() {
    return (
        <BrowserRouter>
      <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/main' component={Main}/>
          <Route path='/prikazletova' component={PrikazLetova}/>
          <Route path='/prikazputnika' component={PrikazPutnika}/>
          <Route path='/putnik' component={Putnik}/>
          <Route path='/let' component={Let}/>
          <Route path='/letovi' component={Letovi}/>
          <Route path='/adminmain' component={AdminMain}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;