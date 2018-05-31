import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class CurlButton extends Component {
  state = {
    value: '',
    copied: false,
  };
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
              <input style={{ textAlign: 'center' }} placeholder="Enter QA Box" value={this.state.value}
                onChange={({ target: { value } }) => this.setState({ value, copied: false })} />
            </Center>
            <Center>
              <CopyToClipboard text={"ssh qa-" + this.state.value + ".sofitest.com"} onCopy={() => this.setState({ copied: true })}>
                <button
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
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

export default connect(mapStateToProps)(CurlButton);
