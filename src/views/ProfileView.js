import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { ArrowRightShort } from 'react-bootstrap-icons';

import AuthService from '../services/auth.service';

class ProfileView extends React.Component {
  state = {
    user: AuthService.getCurrentUser()
  }

  render (){
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <Row style={{alignItems: 'center'}}>
          <Col>
            <h1 style={{margin: "20px 0"}}>Informazioni Utente</h1>
          </Col>
          <Col>
            <div class="float-xl-right">
              <Button variant="light" as={Link} to="/logout">
                <ArrowRightShort size={24} />
                Esci
              </Button>
            </div>
          </Col>
        </Row>
        <hr />
        <Row style={{alignItems: 'center'}}>
          <Col>
            <Image src={`${process.env.PUBLIC_URL}/user.png`} roundedCircle />
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
      </div>
    )
  }
}

export default ProfileView;
