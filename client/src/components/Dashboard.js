import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/Header.css';

class Dashboard extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div className="content-title">
            <h1 style={{ textAlign: 'center' }}>THIS WILL BE THE DASHBOARD</h1>
            <div>
              <h4 style={{ textAlign: 'center' }}>
                Will be parsing google sheet into this container
              </h4>
            </div>
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

export default connect(mapStateToProps)(Dashboard);
