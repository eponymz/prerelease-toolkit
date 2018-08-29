import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'reactstrap';

class CatVersion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
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
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  Run this to print the version file for app specified
                  <br />
                </h5>
              </div>
              <Center>
                <input
                  style={{ textAlign: 'center' }}
                  placeholder="Enter App Name"
                  value={this.state.value}
                  onChange={({ target: { value } }) =>
                    this.setState({ value, copied: false })
                  }
                />
              </Center>
              <Center>
                <CopyToClipboard
                  text={
                    'docker exec -it ' + this.state.value + ' cat version.txt'
                  }
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark pt-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Copy Command
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

export default connect(mapStateToProps)(CatVersion);
