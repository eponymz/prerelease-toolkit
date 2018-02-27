import React, { Component } from 'react';
import triage from '../triage.svg';
import '../css/Header.css';
import '../css/GoogleBtn.css';

class Header extends Component {
  render() {
    return (
      <div>
        <header className="Header navbar-header">
          <div className="image-header">
            <img src={triage} className="Header-logo" alt="logo" />
            <a className="no-underline navbar-title" href="/dashboard">
              T O O L K I T
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
