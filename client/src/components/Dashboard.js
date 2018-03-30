import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import Center from 'react-center';
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
            <h3
              style={{
                textAlign: 'center',
                marginLeft: '100px',
                marginRight: '100px'
              }}
            >
              If you are using this app and you have requests for content, reach
              out to Ian. Learning is good for him. This app is deadended for
              him otherwise, due to not having access to internal content.
            </h3>
            <h3 style={{ textAlign: 'center' }}>
              Here is a button that goes to failarmy. Since ya know, time
              wastin.. shhh I wont tell anyone.
            </h3>
            <div className="content-min">
              <Center>
                <a
                  className="no-underline relic-button"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/watch?v=XMptpfyA5L8"
                >
                  FAILARMY
                </a>
                {/* <Link
                  to={this.props.auth ? '/z/pre-release/ian_smoke' : '/'}
                  className="no-underline relic-button"
                  // onClick={fetchIan()}
                >
                  Ian's Results
                </Link> */}
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
