import React from 'react';

import AuthService from '../services/auth.service';

class HomeView extends React.Component {

  render (){
    return (
      <h1>Ciao "{AuthService.getCurrentUser()}"</h1>
    )
  }
}

export default HomeView;
