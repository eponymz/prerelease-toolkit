import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class Dashboard extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div className="content-title body">
            <h1 style={{ textAlign: 'center' }}>This page is so lonely.</h1>
            <Center>
              <div className="release-center">
                <Center>
                  <iframe
                    title="so ronery"
                    width="640"
                    height="360"
                    src="https://www.youtube.com/embed/UEaKX9YYHiQ?autoplay=1"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  />
                </Center>
              </div>
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

export default connect(mapStateToProps)(Dashboard);
