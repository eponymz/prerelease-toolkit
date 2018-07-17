import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import Center from 'react-center';
import '../App.css';
//import statusWidget from './statusWidget';

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
            <h3
              style={{
                textAlign: 'center',
                marginLeft: '100px',
                marginRight: '100px'
              }}
            >
              I honestly don't even care. As soon as I have some sort of content
              worthy of dashboardyness, guess what, it will be here. Until then,
              enjoy this free link to FAILARMY. Tell them I sent you. Or dont, I
              don't care. :)
            </h3>
            <h3
              style={{
                textAlign: 'center',
                marginLeft: '100px',
                marginRight: '100px'
              }}
            >
              CONGRATS! If you are here, then ... you're welcome.
            </h3>
            <div className="content-min">
              <Center>
                <a
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/watch?v=XMptpfyA5L8"
                >
                  FAILARMY
                </a>
                {/* <Link
                  to={this.props.auth ? '/z/pre-release/ian_smoke' : '/'}
                  className="no-underline relic-button"
                  // onClick={fetchIan()}
                >
                  Ian's Results
                </Link> */}
                {/* <Link
                  to={this.props.auth ? '/z/pre-release/borrower' : '/'}
                  className="no-underline relic-button"
                >
                  BORROWER
                </Link>
                <Link
                  to={this.props.auth ? '/z/pre-release/activities' : '/'}
                  className="no-underline relic-button"
                >
                  ACTIVITIES
                </Link> */}
                {/* <Link
                  to={this.props.auth ? '/z/post-release-report' : '/'}
                  className="no-underline navbar-title"
                >
                  Post Release Report
                </Link> */}
              </Center>
            </div>
            <br />
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
