import React, { Component } from 'react';
import triage from '../triage.svg';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Center from 'react-center';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={triage} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Release Triage Toolkit!</h1>
        </header>
        <a href="/auth/google">
          <Center>
            <GoogleLoginButton href="/auth/google" />
          </Center>
        </a>
      </div>
    );
  }
}

export default App;
