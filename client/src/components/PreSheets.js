import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class PreSheets extends Component {
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
              <h3 style={{ textAlign: 'center' }}>QA Release Sheet</h3>
            </div>
            <div>
              <Center>
                <Link
                  to={this.props.auth ? '/z/pre-release/qa-sheet' : '/'}
                  className="no-underline relic-button"
                >
                  QA RELEASE SHEET
                </Link>
              </Center>
            </div>
            <div className="content-title">
              <h3 style={{ textAlign: 'center' }}>
                Automation Results && Ratings
              </h3>
            </div>
            <div>
              <Center>
                <Link
                  to={this.props.auth ? '/z/pre-release/results' : '/'}
                  className="no-underline relic-button"
                >
                  TEST RESULTS && RATINGS
                </Link>
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

export default connect(mapStateToProps)(PreSheets);
