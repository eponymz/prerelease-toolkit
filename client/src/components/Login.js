import React, { Component } from 'react';
import triage from '../triage.svg';
import '../css/Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <img src={triage} className="Login-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default Login;
