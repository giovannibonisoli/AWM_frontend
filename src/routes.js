import React from 'react';
import { Route } from 'react-router-dom';

import BarrelSetView from './views/BarrelSetView';
import BarrelView from './views/BarrelView';
import OperationTypeView from './views/OperationTypeView';
import OperationView from './views/OperationView';

const BaseRouter = () => (
  <div>
    <Route exact path='/barrel_set' component={BarrelSetView} />
    <Route exact path='/barrel_set/:setID' component={BarrelView} />
    <Route exact path='/operation_type' component={OperationTypeView} />
    <Route exact path='/operation/:name' component={OperationView} />
  </div>
);

export default BaseRouter;
