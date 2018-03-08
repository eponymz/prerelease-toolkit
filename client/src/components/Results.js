import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class Results extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div>
            <div className="content-title content">
              <h3 style={{ textAlign: 'center' }}>
                AUTOMATION RESULTS && RISK RATING
              </h3>
              <Center>
                <div className="release-center">
                  <Center>
                    <iframe
                      title="qa release sheet"
                      src="https://docs.google.com/spreadsheets/d/1eF9PbZY_1Gy0vBTqVZwROJj8glOLNcryrVhnaml4nmQ/edit?usp=sharing?&rm=minimal"
                      width="100%"
                      height="1150px"
                      scrolling="no"
                      frameborder="2px"
                    />
                  </Center>
                </div>
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

export default connect(mapStateToProps)(Results);
