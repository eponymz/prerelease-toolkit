import React, { Component } from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Center from 'react-center';
import '../App.css';
import '../css/GoogleBtn.css';

class GoogleButton extends Component {
  render() {
    return (
      <div className="App">
        <a className="no-underline" href="/auth/google">
          <Center>
            <GoogleLoginButton className="no-underline" />
          </Center>
        </a>
      </div>
    );
  }
}

export default GoogleButton;
