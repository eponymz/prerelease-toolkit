import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Footer extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div id="footer sticky-bottom">
            <footer>
              <div
                className="pb-2 pt-5"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '8px',
                  color: 'rgb(146,146,146)',
                  textAlign: 'center'
                }}
              >
                ©2018 | Ian Sabey
              </div>
            </footer>
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

export default connect(mapStateToProps)(Footer);
