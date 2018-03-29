import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Center from 'react-center';
//import fetchIan from './FetchinCoo';
import '../css/Header.css';
import '../css/Prerelease.css';

class Dashboard extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div className="content-title body">
            <h1 style={{ textAlign: 'center' }}>This page is so lonely.</h1>
            <div className="content-min">
              <Center>
                <Link
                  to={this.props.auth ? '/z/pre-release/ian_smoke' : '/'}
                  className="no-underline relic-button"
                  // onClick={fetchIan()}
                >
                  Ian's Results
                </Link>
                {/* <Link
                  to={this.props.auth ? '/z/pre-release/borrower' : '/'}
                  className="no-underline relic-button"
                >
                  BORROWER
                </Link>
                <Link
                  to={this.props.auth ? '/z/pre-release/activities' : '/'}
                  className="no-underline relic-button"
                >
                  ACTIVITIES
                </Link> */}
                {/* <Link
                  to={this.props.auth ? '/z/post-release-report' : '/'}
                  className="no-underline navbar-title"
                >
                  Post Release Report
                </Link> */}
              </Center>
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
