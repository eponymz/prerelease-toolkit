import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'reactstrap';

class ActivityCurl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boxValue: '',
      activityValue: '',
      copied: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.logger = this.logger.bind(this);
    this.stateTimeout = this.stateTimeout.bind(this);
  }

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  logger() {
    console.log(
      'Copied curl for box: ' +
        this.state.boxValue +
        ' - with the activity ID of: ' +
        this.state.activityValue
    );
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
            <Center>
              {this.state.copied ? (
                <Alert
                  color="success"
                  id="copySuccess"
                  style={{
                    textAlign: 'center',
                    fontFamily: "'Orbitron', sans-serif",
                    width: '50%'
                  }}>
                  Copied!!
                </Alert>
              ) : null}
            </Center>
            <div className="content-title">
              <h5 style={{ textAlign: 'center' }}>
                These will copy the curl commands to complete activities.
              </h5>
              <Center>
                <input
                  name="boxValue"
                  style={{ textAlign: 'center' }}
                  placeholder="Kraken Box Number"
                  value={this.state.boxValue}
                  onChange={this.handleChange}
                />
              </Center>
            </div>
            <br />
            <Center>
              <input
                name="activityValue"
                style={{ textAlign: 'center' }}
                placeholder="Enter Activity ID"
                value={this.state.activityValue}
                onChange={this.handleChange}
              />
            </Center>
            <Center>
              <CopyToClipboard
                text={
                  'curl -X GET http://qa-' +
                  this.state.boxValue +
                  '.sofitest.com:9019/w/api/v1/activity/checkoutActivity/bbdab2f76d0fbf8a6c860fda9b681fd159937cbe0acfe76d6a213beeb35b2f24/' +
                  this.state.activityValue
                }
                onCopy={this.stateTimeout}>
                <button
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                  onClick={this.logger}>
                  curl -x GET
                </button>
              </CopyToClipboard>
            </Center>
            <br />
            <Center>
              <input
                name="activityValue"
                style={{ textAlign: 'center' }}
                placeholder="Enter Activity ID"
                value={this.state.activityValue}
                onChange={this.handleChange}
              />
            </Center>
            <Center>
              <CopyToClipboard
                text={
                  'curl -X POST http://qa-' +
                  this.state.boxValue +
                  '.sofitest.com:9019/w/api/v1/activity/completeActivity/bbdab2f76d0fbf8a6c860fda9b681fd159937cbe0acfe76d6a213beeb35b2f24/3236/' +
                  this.state.activityValue +
                  '/CMPLT'
                }
                onCopy={this.stateTimeout}>
                <button
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                  onClick={this.logger}>
                  curl -x POST
                </button>
              </CopyToClipboard>
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

export default connect(mapStateToProps)(ActivityCurl);
