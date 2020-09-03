import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import CustomNavBar from './components/CustomNavBar';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import BarrelSetView from './views/BarrelSetView';
import BarrelView from './views/BarrelView';
import OperationTypeView from './views/OperationTypeView';
import OperationView from './views/OperationView';

import AuthService from '../src/services/auth.service';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      AuthService.isLoggedIn() ? (
        <div>
          {props.location.pathname !== '/logout' && <CustomNavBar />}
          <Component {...props} />
        </div>
      )
      : <Redirect to="/login" />
    )} />
  );
};

const PublicRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      AuthService.isLoggedIn() ?
        <Redirect to="/home" />
          : <Component {...props} />
    )} />
  );
};

export const BaseRouter = (props) => {
  return (
    <div>
      <Switch>
        <PublicRoute path='/login' component={LoginView} />
        <PrivateRoute path='/home' component={HomeView} />
        <PrivateRoute path='/barrel_set' component={BarrelSetView} />
        <PrivateRoute path='/barrel/:setID' component={BarrelView} />
        <PrivateRoute path='/operation_type' component={OperationTypeView} />
        <PrivateRoute path='/operation/:name' component={OperationView} />
        <PrivateRoute path='/logout' component={LogoutView} />
        <PrivateRoute component={() => (<h1>Pagina non trovata</h1>)} />
      </Switch>
    </div>
  )
};
