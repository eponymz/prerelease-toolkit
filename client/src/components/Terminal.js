import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Terminal from 'react-bash';
import Center from 'react-center';
import '../css/Header.css';

class Bash extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div className="content-title">
            <h1 style={{ textAlign: 'center' }}>BASH COMMANDS</h1>
            <h3 style={{ textAlign: 'center' }}>
              Not yet hooked to local path
            </h3>
            <Center>
              <Terminal
                prefix="triage@default"
                styles={{
                  backgroundColor: 'rgb(50,50,50)'
                }}
              />
            </Center>
          </div>
        );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Bash);
