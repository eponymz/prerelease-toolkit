import React, { Component } from 'react';
import triage from './triage.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={triage} className="App-logo" alt="logo" />
          <h1 className="App-title">Look It Up Buttercup</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="/auth/google">Sign In With Google</a>
      </div>
    );
  }
}

export default App;
