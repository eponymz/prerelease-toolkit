import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Center from 'react-center';
import { Alert } from 'reactstrap';
//import triage from '../triage.svg';
import vaderHelm from '../vaderHelm.svg';
import logout from '../logout.svg';

class Header extends Component {
  // componentDidMount() {
  //   this.isAdmin()
  //     .then(res => this.setState({ isAdmin: res.isAdmin }))
  //     .catch(err => console.log(err));
  // }

  constructor(props) {
    super(props);

    this.state = {
      //isAdmin: false,
      copied: false
    };

    //this.isAdmin = this.isAdmin.bind(this);
    this.stateTimeout = this.stateTimeout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.callApi = this.callApi.bind(this);
    //this.notAdmin = this.notAdmin.bind(this);
  }

  // isAdmin = async () => {
  //   const res = await fetch('/api/crud');
  //   const body = await res.json();
  //   if (res.status !== 200) throw Error(body.message);
  //   return body;
  // };

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
    });
  }

  // notAdmin() {
  //   if (!this.state.isAdmin) {
  //     this.stateTimeout();
  //   }
  // }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div>
            <nav className="navbar pb-1 pt-0 pr-0 pl-2 sticky-top navbar-dark bg-dark border-bottom border-light">
              <div>
                <Link
                  to={this.props.auth ? '/z/dashboard' : '/'}
                  className="text-white pr-4 font-weight-bold navbar-brand"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '1.5rem'
                  }}>
                  <img src={vaderHelm} height="50" alt="logo" />T O O L S
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
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Dockerz
                </Link>
                <Link
                  to={this.props.auth ? '/z/misc-dockz' : '/'}
                  className="btn btn-sm font-weight-bold btn-outline-light border-light p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Misc Commands
                </Link>
                <Link
                  to={
                    !this.props.auth
                      ? '/'
                      : this.props.role === 'engUser'
                        ? '/z/eng-utilities'
                        : this.props.role === 'opsUser'
                          ? '/z/ops-utilities'
                          : this.props.role === 'admin'
                            ? '/z/utilities'
                            : '/'
                  }
                  className="btn btn-sm font-weight-bold btn-outline-light border-light p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Utilities
                </Link>
                {this.props.role === 'admin' ? (
                  <Link
                    to={this.props.auth ? '/z/crud' : '/'}
                    className="btn btn-sm font-weight-bold btn-outline-light border-light p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    C R U D
                  </Link>
                ) : null}
                {/* <Link
                  to={this.props.auth ? '/z/hipchat' : '/'}
                  className="no-underline navbar-button"
                >
                  HipChizzat
                </Link> */}
                <a
                  className="btn btn-sm font-weight-bold btn-outline-dark p-sm-1 mr-sm-1"
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
                  href="/api/logout">
                  <div style={{ height: '15px', display: 'inline-block' }}>
                    <img
                      src={logout}
                      style={{ height: '15px', display: 'inline-block' }}
                      className="pr-1"
                      alt="logo"
                    />
                  </div>
                  L O G O U T
                </a>
              </div>
            </nav>
            <Center>
              {this.state.copied ? (
                <Alert
                  color="danger"
                  id="roleFail"
                  style={{
                    textAlign: 'center',
                    fontFamily: "'Orbitron', sans-serif",
                    width: '100%'
                  }}>
                  You do not have the proper role to access this feature!!
                </Alert>
              ) : null}
            </Center>
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

export default connect(mapStateToProps)(Header);
