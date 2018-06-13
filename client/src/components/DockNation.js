import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import '../App.css'
import KrakenSSH from './KrakenSSH';
import CustomUp from './CustomUp';

class DockNation extends Component {
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
              <h3 style={{ textAlign: 'center' }}>Docker Commands</h3>
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>SSH Into the Box</h4>
              </div>
              <Center>
                <CopyToClipboard text="ssh opdev-0.sofitest.com">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    ssh opdev-0
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="ssh opdev-1.sofitest.com">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    ssh opdev-1
                  </button>
                </CopyToClipboard>
              </Center>
              <br />
              <KrakenSSH />
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Getting to the Correct Directory
                </h4>
              </div>
              <Center>
                <CopyToClipboard text="sudo su - sofi">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    sudo su - sofi
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="cd dev-compose-env">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
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
                <CopyToClipboard text="dc ps">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
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
                <CopyToClipboard text="dc down">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    dc down
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="git checkout -- .">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    git checkout -- .
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="git pull">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    git pull
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="./cloud-preper.sh">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
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
                <CopyToClipboard text="dc pull">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    dc pull
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="./docker-cleanup.sh">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
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
                <CopyToClipboard text="dc up -d mysql postgres ; sleep 30">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    dc up -d mysql postgres ; sleep 30
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="dc up db-init">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    dc up db-init
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text="dc up -d qa-stack">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    dc up -d qa-stack
                  </button>
                </CopyToClipboard>
              </Center>
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  If you have 'spun' everything up but some apps arent working, run this.
                </h5>
              </div>
              <Center>
                <CopyToClipboard text="dc up -d --no-recreate qa-stack">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    dc up -d --no-recreate qa-stack
                  </button>
                </CopyToClipboard>
              </Center>
              <br />
              <CustomUp />
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
