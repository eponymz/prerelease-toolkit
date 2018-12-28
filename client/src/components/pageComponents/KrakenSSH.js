import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'reactstrap';

class KrakenCopy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      copied: false,
      boxType: 'kraken-qa'
    };

    this.handleChange = this.handleChange.bind(this);
    this.stateTimeout = this.stateTimeout.bind(this);
    this.updateBoxType = this.updateBoxType.bind(this);
  }

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  updateBoxType(boxType) {
    this.setState({ boxType: boxType });
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
            <Center>
              <div>
                <select
                  name="boxType"
                  value={this.state.boxType}
                  onChange={event => {
                    this.updateBoxType(event.target.value);
                  }}>
                  <option>kraken-qa</option>
                  <option>qa</option>
                </select>
              </div>
              <input
                style={{ textAlign: 'center' }}
                placeholder="Enter QA Box"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </Center>
            <Center>
              <CopyToClipboard
                text={
                  'ssh ' +
                  this.state.boxType +
                  '-' +
                  this.state.value +
                  '.sofitest.com'
                }
                onCopy={this.stateTimeout}>
                <button
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  ssh kraken
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

//, copied: false

export default connect(mapStateToProps)(KrakenCopy);
