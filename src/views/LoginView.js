import React from 'react';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import AuthService from '../services/auth.service';

import './LoginView.css'

class LoginView extends React.Component {
  state = {
      error: false
    };


  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleLogin = async e => {
    e.preventDefault();

    const login = await AuthService.login(this.state.username, this.state.password);
    if(login === "login successful"){

      this.props.history.push('/profile');
    }
    else{
      this.setState({error: true});
    }

  }


  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Form onSubmit={this.handleLogin}>
            <h3>Acetaia</h3>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.onChange}
                            required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                            name = "password"
                            placeholder="Password"
                            onChange={this.onChange}
                            required/>
            </Form.Group>

            {this.state.error && (
              <Alert variant="danger">
                Errore! Credenziali errate
              </Alert>)
            }
            <Button variant="primary" className="btn-block" type="submit">
              Entra
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default LoginView;
