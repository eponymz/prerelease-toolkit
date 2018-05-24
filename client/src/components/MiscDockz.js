import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class MiscDockz extends Component {

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
            <div className="content-title">
              <h3 style={{ textAlign: 'center' }}>Misc. Docker Commands</h3>
            </div>
            <hr />
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  If you are having issues with activities showing up, run this.<br />
                  *MAKE SURE YOU UPDATE THE DOMAIN BEFORE YOU EXECUTE THIS COMMAND IN TERMINAL!*
                </h5>
              </div>
              <Center>
                <input placeholder="Enter Box Number" value={this.state.value}
                  onChange={({ target: { value } }) => this.setState({ value, copied: false })} />
              </Center>
              <Center>
                <CopyToClipboard text={"curl -X GET http://qa-" + this.state.value + ".sofitest.com:9024/cs/v2/customers/batchReplicateToElasticSearch/500"}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    cURL to update ElasticSearch
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

export default connect(mapStateToProps)(MiscDockz);
