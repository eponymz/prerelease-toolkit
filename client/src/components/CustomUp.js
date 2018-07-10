import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'reactstrap';

class CustomUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      copied: false
    }

    this.stateTimeout = this.stateTimeout.bind(this);

  }

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false })
      }, 3000)
    })
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
            <div>
              <Center>
                {this.state.copied ? <Alert color="success" id="copySuccess" style={{ textAlign: 'center', fontFamily: "'Orbitron', sans-serif", width: '50%' }}>Copied!!</Alert> : null}
              </Center>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  You can choose specific apps to 'spin up'. If more than one, make sure to separate with a space.<br />
                </h5>
              </div>
              <Center>
                <input style={{ textAlign: 'center' }} placeholder="Enter Apps" value={this.state.value}
                  onChange={({ target: { value } }) => this.setState({ value })} />
              </Center>
              <Center>
                <CopyToClipboard text={"dc up -d --no-recreate " + this.state.value} onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark pt-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Up With --no-recreate Flag
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text={"dc up -d " + this.state.value} onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark pt-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Up Normally
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

export default connect(mapStateToProps)(CustomUp);
