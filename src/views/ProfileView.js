import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import AuthService from '../services/auth.service';

class ProfileView extends React.Component {
  state = {
    user: AuthService.getCurrentUser()
  }

  render (){
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <h1 style={{margin: "20px 0"}}>Informazioni Utente</h1>
        <hr />
        <Container>
          <Row>
            <Col>
              <Image  src={`${process.env.PUBLIC_URL}/user.png`} roundedCircle />
            </Col>
            <Col>
              <h6>Nome</h6>
              <p>{this.state.user.first_name}</p>
              <h6>Cognome</h6>
              <p>{this.state.user.last_name}</p>
              <h6>Email</h6>
              <p>{this.state.user.email}</p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ProfileView;
