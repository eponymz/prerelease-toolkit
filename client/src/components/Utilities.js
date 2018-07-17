/*global chrome*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Center from 'react-center';
import '../App.css';

class Utilities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketNumber: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.barnacleButton = this.barnacleButton.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  barnacleButton() {
    var editorExtensionId = 'noikhccpojdclobaamiinlaiiojpfhdc';
    chrome.runtime.sendMessage(editorExtensionId, {
      greeting: 'barnacles',
      message: this.state.ticketNumber
    });
    this.setState({ ticketNumber: '' });
  }

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
            <div>
              <Center>
                <Link
                  to={this.props.auth ? '/z/utilities/loan-calculator' : '/'}
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  LOAN CALCULATOR
                </Link>
              </Center>
              <hr />
              <br />
              <Center>
                <input
                  name="ticketNumber"
                  style={{ textAlign: 'center' }}
                  placeholder="Enter Apps"
                  value={this.state.ticketNumber}
                  onChange={this.handleChange}
                />
              </Center>
              <br />
              <Center>
                <Link
                  to={this.props.auth ? '/z/utilities/branch-lookup' : '/'}
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                  onMouseDown={this.barnacleButton}
                >
                  BUILDS BY TICKET
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
