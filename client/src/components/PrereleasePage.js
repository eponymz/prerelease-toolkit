import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

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
            <h3 style={{ textAlign: 'center' }}>
              Operator Response && Memory Usage
            </h3>
            <div>
              <div className="relic-left">
                <Center>
                  <iframe
                    src="https://rpm.newrelic.com/public/charts/ibJnMzIDjVk"
                    width="97%"
                    height="300"
                    scrolling="no"
                    frameborder="no"
                  />
                </Center>
              </div>
              <div className="relic-right">
                <Center>
                  <iframe
                    src="https://rpm.newrelic.com/public/charts/7UEd0MgVlVu"
                    width="97%"
                    height="300"
                    scrolling="no"
                    frameborder="no"
                  />
                </Center>
              </div>
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
