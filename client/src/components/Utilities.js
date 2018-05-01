import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class Utilities extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div>
            <div className="content-title">
              <h3
                style={{
                  textAlign: 'center'
                }}
              >
                Helpful Tools
              </h3>
            </div>
            <div className="content-min">
              <Center>
                <Link
                  to={this.props.auth ? '/z/utilities/loan-calculator' : '/'}
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  LOAN CALCULATOR
                </Link>
                {/* <Link
                  to={this.props.auth
                  ? '/z/utilities/checklist'
                  : '/'}
                  className="no-underline relic-button">
                  CHECKLIST
                </Link> */}
                {/* <Link
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
//change for shits
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Utilities);
