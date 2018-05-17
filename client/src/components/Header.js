import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import triage from '../triage.svg';
import logout from '../logout.svg';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <nav className="navbar pb-1 pt-0 pr-0 pl-2 sticky-top navbar-dark bg-dark border-bottom border-light">
            <div>
              <Link
                to={this.props.auth ? '/z/dashboard' : '/'}
                className="navbar-brand"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <img src={triage} className="navbar-brand" width="50" height="50" alt="logo" />
                T O O L S
              </Link>
              {/* <Link
                to={this.props.auth ? '/z/pre-release' : '/'}
                className="btn btn-sm font-weight-bold btn-outline-light border-light p-sm-1 mr-sm-1"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Pre Release
              </Link> */}
              <Link
                to={this.props.auth ? '/z/dockin-it' : '/'}
                className="btn btn-sm font-weight-bold btn-outline-light border-light p-sm-1 mr-sm-1"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Dockerz
              </Link>
              <Link
                to={this.props.auth ? '/z/utilities' : '/'}
                className="btn btn-sm font-weight-bold btn-outline-light border-light p-sm-1 mr-sm-1"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Utilities
              </Link>

              {/* <Link
                  to={this.props.auth ? '/z/post-release-report' : '/'}
                  className="no-underline navbar-button"
                >
                  Post Release Report
                </Link> */}
              {/* <Link
                  to={this.props.auth ? '/z/hipchat' : '/'}
                  className="no-underline navbar-button"
                >
                  HipChizzat
                </Link> */}
              <a

                className="btn btn-sm font-weight-bold p-sm-1 mr-sm-1"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '10px',
                  color: 'gray',
                  textDecoration: 'none',
                  position: 'absolute',
                  right: '10px',
                  top: '25%',
                  transitionDuration: '0.2s'
                }}
                href="/api/logout"
              >
                <div style={{ height: '15px', display: 'inline-block' }}>
                  <img src={logout} style={{ height: '15px', display: 'inline-block' }} className="pr-1" alt="logo" />
                </div>

                L O G O U T
              </a>
            </div>
          </nav>
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

export default connect(mapStateToProps)(Header);
