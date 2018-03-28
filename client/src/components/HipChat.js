import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class HipChat extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div
            style={{
              width: '-webkit-fill-available',
              height: 'calc(100% - 200px) !important'
            }}
          >
            <iframe
              style={{
                width: '-webkit-fill-available',
                height: '-webkit-fill-available',
                margin: '5px',
                paddingBottom: '115px'
              }}
              title="so ronery"
              src="https://sofiinc.hipchat.com/chat/room/3270408"
              frameBorder="0"
            />
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

export default connect(mapStateToProps)(HipChat);
