import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import BaseRouter from './routes';
import CustomNavBar from './components/CustomNavBar';


class App extends React.Component {

  render(){
    return (
      <div>
        <Router>
          <CustomNavBar />
          <BaseRouter />
        </Router>
      </div>
    );
  }
}

export default App;
