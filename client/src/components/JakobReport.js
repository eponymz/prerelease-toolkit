import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';

class JakobReport extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div className="navbar-title">
            <h1 style={{ textAlign: 'center' }}>P O S T - R E L E A S E</h1>
            <h1 style={{ textAlign: 'center' }}>R E P O R T</h1>
            <Center>
              <iframe
                width="1000"
                height="800"
                src="https://datastudio.google.com/embed/reporting/1gYy9a_0gC-vLpkWiCdKUr-DKpXIiTefS/page/FpQO"
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

export default connect(mapStateToProps)(JakobReport);
