import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Center from 'react-center';

import '../../App.css';

class BackUtil extends Component {
  lsClear = () => {
    localStorage.removeItem('branches');
  };
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
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1 mt-5"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                  onClick={this.lsClear}
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
