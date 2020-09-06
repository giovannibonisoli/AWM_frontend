import React from 'react';
import Button  from 'react-bootstrap/Button';

import AuthService from '../services/auth.service';

import './LoginView.css'

class LogoutView extends React.Component {

  constructor(props){
   super(props);
   this.goBack = this.goBack.bind(this);
 }

  goBack = () => {
    this.props.history.goBack();
  }

  handlelogout = () => {
    AuthService.logout();
    this.props.history.push('/logout');
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Sicuro di voler uscire?</h3>
          <Button style={{marginLeft: 90}} variant="secondary" onClick={this.goBack}>Annulla</Button>
          <Button style={{marginLeft: 5}} onClick={this.handlelogout}>Ok</Button>
        </div>
      </div>
    )
  }
}

export default LogoutView;
