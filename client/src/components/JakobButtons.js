import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class JakobButtons extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div>
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  Clean out unused docker images
                </h5>
              </div>
              <Center>
                <CopyToClipboard text="docker images | awk '{print $3}' | xargs docker rmi -f">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    docker images | awk 'print $3' | xargs docker rmi -f
                  </button>
                </CopyToClipboard>
              </Center>
            </div>
            <br />
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  Clean up stopped/exited containers
                </h5>
              </div>
              <Center>
                <CopyToClipboard text="docker ps -a | grep Exited | awk '{print $1}' | xargs docker rm -fv">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    docker ps -a | grep Exited | awk 'print $1' | xargs docker rm -fv
                  </button>
                </CopyToClipboard>
              </Center>
            </div>
            <br />
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  Search for big files
                </h5>
              </div>
              <Center>
                <CopyToClipboard text="for i in $(ls);do du -sh $i | grep G;done">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    for i in $(ls);do du -sh $i | grep G;done
                  </button>
                </CopyToClipboard>
              </Center>
            </div>
            <br />
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  If you find a log file that is huge
                </h5>
              </div>
              <Center>
                <CopyToClipboard text="cp /dev/null <file name>">
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    cp /dev/null filename
                  </button>
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

export default connect(mapStateToProps)(JakobButtons);









