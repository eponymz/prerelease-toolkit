import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../css/Header.css';
import '../css/Prerelease.css';

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
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>SSH Into the Box</h4>
              </div>
              <Center>
                <CopyToClipboard text="ssh opdev-0.sofitest.com">
                  <button className="relic-button">ssh opdev-0</button>
                </CopyToClipboard>
                <CopyToClipboard text="ssh opdev-1.sofitest.com">
                  <button className="relic-button">ssh opdev-1</button>
                </CopyToClipboard>
                <CopyToClipboard text="ssh qa-<number>.sofitest.com">
                  <button className="relic-button">ssh kraken</button>
                </CopyToClipboard>
              </Center>
            </div>
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Getting to the Correct Directory
                </h4>
              </div>
              <Center>
                <CopyToClipboard text="sudo su - sofi">
                  <button className="relic-button">sudo su - sofi</button>
                </CopyToClipboard>
                <CopyToClipboard text="cd dev-compose-env">
                  <button className="relic-button">cd dev-compose-env</button>
                </CopyToClipboard>
              </Center>
            </div>
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  IMPORTANT! RUN THIS BEFORE CONTINUING!
                </h4>
              </div>
              <Center>
                <CopyToClipboard text="dc ps">
                  <button className="relic-button">dc ps</button>
                </CopyToClipboard>
              </Center>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  IF THIS RETURNS NOTHING, SKIP THE "dc down" COMMAND!
                </h4>
              </div>
            </div>
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Updating the Local Repository
                </h4>
              </div>
              <Center>
                <CopyToClipboard text="dc down">
                  <button className="relic-button">dc down</button>
                </CopyToClipboard>
                <CopyToClipboard text="git checkout -- .">
                  <button className="relic-button">git checkout -- .</button>
                </CopyToClipboard>
                <CopyToClipboard text="git pull">
                  <button className="relic-button">git pull</button>
                </CopyToClipboard>
                <CopyToClipboard text="./cloud-preper.sh">
                  <button className="relic-button">./cloud-preper.sh</button>
                </CopyToClipboard>
              </Center>
            </div>
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Updating the Docker Compose
                </h4>
              </div>
              <Center>
                <CopyToClipboard text="dc pull">
                  <button className="relic-button">dc pull</button>
                </CopyToClipboard>
                <CopyToClipboard text="./docker-cleanup.sh">
                  <button className="relic-button">./docker-cleanup.sh</button>
                </CopyToClipboard>
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

export default connect(mapStateToProps)(DockNation);
