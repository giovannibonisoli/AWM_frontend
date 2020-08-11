import React from 'react';
import { Route } from 'react-router-dom';

import BarrelSetView from './views/BarrelSetView';
import BarrelView from './views/BarrelView';

const BaseRouter = () => (
  <div>
    <Route exact path='/barrel_set' component={BarrelSetView} />
    <Route exact path='/barrel_set/:setID' component={BarrelView} />
  </div>
);

export default BaseRouter;
