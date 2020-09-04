import React from 'react';

import AuthService from '../services/auth.service';

class HomeView extends React.Component {
  state = {}

  render (){
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <h1 style={{margin: "20px 0"}}>Ciao "{AuthService.getCurrentUser().name}"</h1>
      </div>
    )
  }
}

export default HomeView;
