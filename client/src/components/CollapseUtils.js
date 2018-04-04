import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class BackUtil extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div>
            <div>
              <Center>
                <Link
                  to={this.props.auth ? '/z/utilities' : '/'}
                  className="no-underline relic-button-collapse"
                >
                  † H I D E †
                </Link>
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

export default connect(mapStateToProps)(BackUtil);
