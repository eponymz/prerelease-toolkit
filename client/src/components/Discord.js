import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';

import '../App.css'

class Discord extends Component {
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
              <h3 style={{ textAlign: 'center' }}>QA RELEASE SHEET</h3>
              <Center>
                <div className="release-center">
                  <Center style={{ height: '100%' }}>
                    <iframe
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                      title="qa release sheet"
                      src="https://discordapp.com/widget?id=451589892959633418&theme=dark"
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

export default connect(mapStateToProps)(Discord);