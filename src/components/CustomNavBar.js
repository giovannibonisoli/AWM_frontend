import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


class CustomNavBar extends React.Component {

  render(){
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">Acetaia</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/barrel_sets">Batterie e Barili</Nav.Link>
          <Nav.Link as={Link} to="/operation_type">Operazioni</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default CustomNavBar;
