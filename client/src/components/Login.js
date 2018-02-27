import React, { Component } from 'react';
import triage from '../triage.svg';
import '../App.css';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={triage} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Release Triage Toolkit!</h1>
        </header>
      </div>
    );
  }
}

export default Login;
