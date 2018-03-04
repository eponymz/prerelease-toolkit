import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class Activities extends Component {
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
                Activities Transaction times && Throughput
              </h3>
              <div>
                <div className="relic-left">
                  <Center>
                    <iframe
                      title="actities web transaction times"
                      src="https://rpm.newrelic.com/public/charts/d3F1wq7i5DN"
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
                      title="activities throughput"
                      src="https://rpm.newrelic.com/public/charts/lkYhyLQgRRU"
                      width="97%%"
                      height="300"
                      scrolling="no"
                      frameborder="no"
                    />
                  </Center>
                </div>
              </div>
            </div>
            <div className="content-title content">
              <h3 style={{ textAlign: 'center' }}>Activities Error Rate</h3>
              <Center>
                <div className="relic-center">
                  <Center>
                    <iframe
                      title="activities error rate"
                      src="https://rpm.newrelic.com/public/charts/d65VVSExFAm"
                      width="100%"
                      height="300"
                      scrolling="no"
                      frameborder="no"
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

export default connect(mapStateToProps)(Activities);
