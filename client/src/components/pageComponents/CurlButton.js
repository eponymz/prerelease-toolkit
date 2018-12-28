import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'reactstrap';

class CurlButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      copied: false
    };

    this.stateTimeout = this.stateTimeout.bind(this);
    //this.elasticSearch = this.elasticSearch.bind(this);
  }

  // elasticSearch() {
  //   fetch(
  //     'http://kraken-qa-' +
  //       this.state.value +
  //       '.sofitest.com:9024/cs/v2/customers/batchReplicateToElasticSearch/500',
  //     {
  //       method: 'GET'
  //     }
  //   );
  // }

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
                  If you are having issues with activities showing up, run this.
                  <br />
                </h5>
              </div>
              <Center>
                <input
                  style={{ textAlign: 'center' }}
                  placeholder="Enter Box Number"
                  value={this.state.value}
                  onChange={({ target: { value } }) =>
                    this.setState({ value, copied: false })
                  }
                />
              </Center>
              <Center>
                <CopyToClipboard
                  text={
                    'curl -X POST http://kraken-qa-' +
                    this.state.value +
                    '.sofitest.com:8925/cs/v2/customers-batch/batchReplicateToElasticSearch?chunkSize=200'
                  }
                  onCopy={this.stateTimeout}>
                  <button
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark pt-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                    onMouseDown={this.elasticSearch}
                    onMouseUp={this.stateTimeout}>
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

export default connect(mapStateToProps)(CurlButton);
