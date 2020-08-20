import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import CustomNavBar from './components/CustomNavBar';
import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import BarrelSetView from './views/BarrelSetView';
import BarrelView from './views/BarrelView';
import OperationTypeView from './views/OperationTypeView';
import OperationView from './views/OperationView';

import AuthService from '../src/services/auth.service';

export const PrivateRouter = (props) => {

  return (
    AuthService.isLoggedIn() ? (
      <div>
        <CustomNavBar />
        <Route exact path='/logout' component={LogoutView} />
        <Route exact path='/barrel_set' component={BarrelSetView} />
        <Route exact path='/barrel_set/:setID' component={BarrelView} />
        <Route exact path='/operation_type' component={OperationTypeView} />
        <Route exact path='/operation/:name' component={OperationView} />
      </div>
    ) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
  )
};

export const LoginRouter = (props) => {

  return (
    !AuthService.isLoggedIn() ? (
      <Route exact path='/login' component={LoginView}/>
    ) : (<div></div>)
  )
};
