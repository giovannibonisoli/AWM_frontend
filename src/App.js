import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import { LoginRouter, PrivateRouter } from './routes';
import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component {

  render(){
    return (
        <Router>
          <LoginRouter />
          <PrivateRouter />
        </Router>
    );
  }
}

export default App;
