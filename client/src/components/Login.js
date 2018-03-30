import React, { Component } from 'react';
import Center from 'react-center';
import { GoogleLoginButton } from 'react-social-login-buttons';
import triage from '../triage.svg';
import '../css/Login.css';
import '../App.css';
import '../css/GoogleBtn.css';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="Login">
          <header className="Login-header">
            <img src={triage} className="Login-logo" alt="logo" />
          </header>
        </div>
        <div className="Login">
          <header>
            <h1 className="Login-title">T R I A G E</h1>
          </header>
        </div>
        <div className="App">
          <a className="no-underline" href="/auth/google">
            <Center>
              <GoogleLoginButton className="no-underline" />
            </Center>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
