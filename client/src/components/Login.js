import React, { Component } from 'react';
import Center from 'react-center';
import { GoogleLoginButton } from 'react-social-login-buttons';
import tieFighter from '../tieFighter.svg';
import iconBG from '../iconBG.svg'
import '../App.css';


class Login extends Component {
  render() {
    return (
      <div>
        <div className="Login">
          <header className="Login-header">
            <img src={iconBG} style={{
              position: 'absolute',
              width: '110%',
              left: '0',
              top: '0'
            }}
            />
            <div>
              <img src={tieFighter} className="Login-logo" alt="logo" />
            </div>
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
