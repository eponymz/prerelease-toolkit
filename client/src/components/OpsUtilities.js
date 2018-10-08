import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Center from 'react-center';
import '../App.css';

class ComponentName extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div>
            <div className="content-title">
              <h3
                style={{
                  textAlign: 'center'
                }}>
                Helpful Tools
              </h3>
            </div>
            <div>
              <Center>
                <Link
                  to={this.props.auth ? '/z/ops-crud' : '/'}
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  OPS A to Z
                </Link>
              </Center>
              <hr />
              {/* {this.props.role === 'admin' ? <MoreLazy /> : null} */}

              <br />
              <Center>
                {/* <Link
                  to={this.props.auth
                  ? '/z/utilities/checklist'
                  : '/'}
                  className="no-underline relic-button">
                  CHECKLIST
                </Link> */}
                {/* <Link
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
          </div>
        );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ auth, role }) {
  return { auth, role };
}

export default connect(mapStateToProps)(ComponentName);
