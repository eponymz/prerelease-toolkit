import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; 
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class HugeFile extends Component {
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
            <div>
              <div className="content-title">
                <h5 style={{ textAlign: 'center' }}>
                  If you find a log file that is huge
                </h5>
              </div>
              <Center>
                <input style={{ textAlign: 'center' }} placeholder="File Name" value={this.state.value}
                  onChange={({ target: { value } }) => this.setState({ value, copied: false })} />
              </Center>
              <Center>
                <CopyToClipboard text={"cp /dev/null " + this.state.value}>
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

export default connect(mapStateToProps)(HugeFile);
