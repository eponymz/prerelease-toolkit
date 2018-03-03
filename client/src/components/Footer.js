import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Center from 'react-center';
import '../css/Footer.css';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer-bar">
          <div className="footer-component">©2018 | Ian Sabey</div>
        </footer>
      </div>
    );
  }
}

export default Footer;
