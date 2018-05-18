import React, { Component } from 'react';
import Center from 'react-center';
import { GoogleLoginButton } from 'react-social-login-buttons';
import tieFighter from '../tieFighter.svg';
//import icon_BG from '../icon_BG.svg'
import '../App.css';


class Login extends Component {
  render() {
    return (
      <div>
        <div className="Login">
          <header className="Login-header">
            <img src={tieFighter} className="Login-logo" alt="logo" />
          </header>
        </div>
        <div className="Login">
          <header>
            <h1 className="Login-title">IAN's TOOLS</h1>
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
