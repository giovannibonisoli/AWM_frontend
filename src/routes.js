import React from 'react';
import { Route } from 'react-router-dom';

import BarrelSetView from './views/BarrelSetView';

const BaseRouter = () => (
  <div>
    <Route exact path='/barrel_sets' component={BarrelSetView} />
  </div>
);

export default BaseRouter;
