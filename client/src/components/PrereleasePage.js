import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';

class Prerelease extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div className="content-title">
            <h1 style={{ textAlign: 'center' }}>
              THIS WILL BE IAN AND DAVID'S RESOURCE PAGE
            </h1>
            <h3 style={{ textAlign: 'center' }}>
              PRE-RELEASE PAGE WILL BE PARSED IN TO DIV BELOW THIS .. AS SOON AS
              ATLASSIAN FIXES THEIR SHIT ..
            </h3>
            <div>
              <Center>
                <iframe
                  title="Pre-Release Page"
                  width="1300"
                  height="1350"
                  src="https://sofiinc.atlassian.net/wiki/spaces/PS/pages/297009248/Pre+-+Release+Team+Page"
                  frameBorder="0"
                />
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

export default connect(mapStateToProps)(Prerelease);