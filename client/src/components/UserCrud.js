import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import { Alert } from 'react-alert';

class UserCrud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleId: '',
      emailVal: '',
      userName: '',
      copied: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.stateTimeout = this.stateTimeout.bind(this);
    this.apiSearch = this.apiSearch.bind(this);
  }

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({
          copied: false,
          googleId: '',
          emailVal: '',
          userName: ''
        });
      }, 3000);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  apiSearch() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({
          copied: false,
          googleId: '',
          emailVal: '',
          userName: ''
        });
      }, 3000);
    });
    this.callApi();
  }

  callApi = async () => {
    const res = await fetch('/api/search_user');
    const body = await res.json();

    if (res.status !== 200) throw Error(body.message);
    return body;
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
            <Center>
              {this.state.copied ? (
                <Alert
                  color="success"
                  id="copySuccess"
                  style={{
                    textAlign: 'center',
                    fontFamily: "'Orbitron', sans-serif",
                    width: '50%'
                  }}>
                  User Created!!
                </Alert>
              ) : null}
            </Center>
            <div className="content-title">
              <h5 style={{ textAlign: 'center' }}>Insert Users</h5>
            </div>
            <br />
            <form action="/api/create_user" method="POST">
              <Center>
                <input
                  name="googleId"
                  style={{ textAlign: 'center' }}
                  placeholder="Google ID"
                  value={this.state.googleId}
                  onChange={this.handleChange}
                />
              </Center>
              {/* <br /> */}
              <Center>
                <input
                  name="emailVal"
                  style={{ textAlign: 'center' }}
                  placeholder="Email"
                  value={this.state.emailVal}
                  onChange={this.handleChange}
                />
              </Center>
              <Center>
                <input
                  name="userName"
                  style={{ textAlign: 'center' }}
                  placeholder="Username"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
              </Center>
              <Center>
                <button
                  type="submit"
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                  onSubmit={this.stateTimeout}>
                  DB Insert
                </button>
              </Center>
            </form>
            <hr />
            <div className="content-title">
              <h5 style={{ textAlign: 'center' }}>Lookup By UserName</h5>
            </div>
            <br />
            <form action="/api/search_user" method="POST">
              <Center>
                <input
                  name="userName"
                  style={{ textAlign: 'center' }}
                  placeholder="Username"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
              </Center>
              <Center>
                <button
                  type="submit"
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                  onSubmit={this.apiSearch}>
                  Search
                </button>
              </Center>
            </form>
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

export default connect(mapStateToProps)(UserCrud);