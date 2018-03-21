import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import copyShit from './copyShit';
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
                <button
                  className="relic-button"
                  onClick={copyShit({ content: 'ssh opdev-0.sofitest.com' })}
                >
                  ssh opdev-0
                </button>
                <button
                  className="relic-button"
                  onClick={copyShit({ content: 'ssh opdev-1.sofitest.com' })}
                >
                  ssh opdev-1
                </button>
                <button
                  className="relic-button"
                  onClick={copyShit({
                    content: 'ssh qa-<number>.sofitest.com'
                  })}
                >
                  ssh kraken
                </button>
              </Center>
            </div>
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Getting to the Correct Directory
                </h4>
              </div>
              <Center>
                <button
                  className="relic-button"
                  onClick={copyShit({ content: 'sudo su - sofi' })}
                >
                  sudo su - sofi
                </button>
                <button
                  className="relic-button"
                  onClick={copyShit({ content: 'cd dev-compose-env' })}
                >
                  cd dev-compose-env
                </button>
              </Center>
            </div>
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  IMPORTANT! RUN THIS BEFORE CONTINUING!
                </h4>
              </div>
              <Center>
                <button
                  className="relic-button"
                  onClick={copyShit({ content: 'dc ps' })}
                >
                  dc ps
                </button>
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
                <button
                  className="relic-button"
                  onClick={copyShit({ content: 'git checkout -- .' })}
                >
                  git checkout -- .
                </button>
                <button
                  className="relic-button"
                  onClick={copyShit({ content: 'git pull' })}
                >
                  git pull
                </button>
                <button
                  className="relic-button"
                  onClick={copyShit({ content: './cloud-preper.sh' })}
                >
                  ./cloud-preper.sh
                </button>
              </Center>
            </div>
            <div>
              <div className="content-title">
                <h4 style={{ textAlign: 'center' }}>
                  Updating the Docker Compose
                </h4>
              </div>
              <Center>
                <button
                  className="relic-button"
                  onClick={copyShit({ content: 'dc pull' })}
                >
                  dc pull
                </button>
                <button
                  className="relic-button"
                  onClick={copyShit({ content: './docker-cleanup.sh' })}
                >
                  ./docker-cleanup.sh
                </button>
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
