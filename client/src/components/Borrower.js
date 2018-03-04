import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class Borrower extends Component {
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
                Borrower Top Transactions && Throughput
              </h3>
              <div>
                <div className="relic-left">
                  <Center>
                    <iframe
                      title="borrower transaction"
                      src="https://rpm.newrelic.com/public/charts/jhWVyEkbTDW"
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
                      title="borrower throughput"
                      src="https://rpm.newrelic.com/public/charts/51ri9IJ2Ekp"
                      width="97%"
                      height="300"
                      scrolling="no"
                      frameborder="no"
                    />
                  </Center>
                </div>
              </div>
            </div>
            <div className="content-title content">
              <h3 style={{ textAlign: 'center' }}>Borrower Error Rate</h3>
              <Center>
                <div className="relic-center">
                  <Center>
                    <iframe
                      title="bwr error rate"
                      src="https://rpm.newrelic.com/public/charts/ew5VtHn3Yl"
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

export default connect(mapStateToProps)(Borrower);
