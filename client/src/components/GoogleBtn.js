import React, { Component } from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Center from 'react-center';
import '../App.css';

class GoogleButton extends Component {
  render() {
    return (
      <div className="App">
        <a href="/auth/google">
          <Center>
            <GoogleLoginButton />
          </Center>
        </a>
      </div>
    );
  }
}

export default GoogleButton;
