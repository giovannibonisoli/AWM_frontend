import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { PersonCircle, PencilSquare, Server } from 'react-bootstrap-icons';


class CustomNavBar extends React.Component {

  render(){
    return (
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/barrel_set">
              <Server size={24} style={{marginRight: 10}}/>
              Batterie e Barili
            </Nav.Link>
            <Nav.Link as={Link} to="/operation_type">
              <PencilSquare size={24} style={{marginRight: 10}}/>
              Operazioni
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/profile">
              <PersonCircle size={24} style={{marginRight: 10}}/>
              {this.props.user.username}
            </Nav.Link>
          </Nav>
        </Navbar>
    );
  }
}

export default CustomNavBar;
