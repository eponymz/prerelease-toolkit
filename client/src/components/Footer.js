import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
import Center from 'react-center';
>>>>>>> parent of b7342f9... updated footer color for more distinction
import '../css/Footer.css';

class Footer extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div>
            <footer className="footer-bar">
              <div className="footer-component">©2018 | Ian Sabey</div>
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
