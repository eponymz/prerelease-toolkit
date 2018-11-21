import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../App.css';
import KrakenCopy from './KrakenSSH';
import CustomUp from './CustomUp';
import { Alert } from 'reactstrap';

class DockNation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };

    this.stateTimeout = this.stateTimeout.bind(this);
  }

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
    });
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
              <h3 style={{ textAlign: 'center' }}>Docker Commands</h3>
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>SSH Into the Box</h4>
              </div>
              <Center>
                <CopyToClipboard
                  text="ssh opdev-0.sofitest.com"
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    ssh opdev-0
                  </button>
                </CopyToClipboard>
                <CopyToClipboard
                  text="ssh opdev-1.sofitest.com"
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    ssh opdev-1
                  </button>
                </CopyToClipboard>
              </Center>
              <br />
              <KrakenCopy />
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Getting to the Correct Directory
                </h4>
              </div>
              <Center>
                <CopyToClipboard
                  text="sudo su - sofi"
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    sudo su - sofi
                  </button>
                </CopyToClipboard>
                <CopyToClipboard
                  text="cd dev-compose-env"
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    cd dev-compose-env
                  </button>
                </CopyToClipboard>
              </Center>
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  IMPORTANT! RUN THIS BEFORE CONTINUING!
                </h4>
              </div>
              <Center>
                <CopyToClipboard text="dc ps" onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    dc ps
                  </button>
                </CopyToClipboard>
              </Center>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  IF THIS RETURNS NOTHING, SKIP THE "dc down" COMMAND!
                </h4>
              </div>
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Updating the Local Repository
                </h4>
              </div>
              <Center>
                <CopyToClipboard text="dc down" onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    dc down
                  </button>
                </CopyToClipboard>
                <CopyToClipboard
                  text="git checkout -- ."
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    git checkout -- .
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="git pull" onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    git pull
                  </button>
                </CopyToClipboard>
                <CopyToClipboard
                  text="./cloud-preper.sh"
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    ./cloud-preper.sh
                  </button>
                </CopyToClipboard>
              </Center>
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Updating the Docker Compose
                </h4>
              </div>
              <Center>
                <CopyToClipboard text="dc pull" onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    dc pull
                  </button>
                </CopyToClipboard>
                <CopyToClipboard
                  text="./docker-cleanup.sh"
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    ./docker-cleanup.sh
                  </button>
                </CopyToClipboard>
              </Center>
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  'Spinning Up' the Environment
                </h4>
              </div>
              <Center>
                <CopyToClipboard
                  text="dc up kafka-init; dc up db-init; dc up -d --no-recreate qa-stack"
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      STARTUP
                  </button>
                </CopyToClipboard>
              </Center>
            </div>
            <br />
            <CustomUp />
            <hr />
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  Up with no-recreate flag.
                </h5>
              </div>
              <Center>
                <CopyToClipboard
                  text="dc up -d --no-recreate qa-stack"
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    dc up -d --no-recreate qa-stack
                  </button>
                </CopyToClipboard>
              </Center>
              <br />
            </div>
            <hr />
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

export default connect(mapStateToProps)(DockNation);
