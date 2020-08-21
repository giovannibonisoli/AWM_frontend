import React from 'react';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';

import AuthService from '../services/auth.service';

import './LoginView.css'

class LoginView extends React.Component {
  state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };


  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleLogin = e => {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });


    AuthService.login(this.state.username, this.state.password)
    .then(() => {
        this.props.history.push('/barrel_set');
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }


  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Form onSubmit={this.handleLogin}>
            <h3>Login</h3>
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
            <Button variant="primary" className="btn-block" type="submit">
              Invia
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default LoginView;
