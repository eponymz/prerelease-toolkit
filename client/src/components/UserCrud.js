import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import { Alert } from 'react-alert';
import { Table } from 'reactstrap';

class UserCrud extends Component {
  // componentDidMount() {
  // this.isAdmin()
  //   .then(res => this.setState({ isAdmin: res.isAdmin }))
  //   .catch(err => console.log(err));
  // console.log(this.props.role);
  // }

  constructor(props) {
    super(props);

    this.state = {
      googleId: '',
      emailVal: '',
      userName: '',
      role: 'user',
      copied: false,
      allUsers: false,
      userList: '',
      singleUser: false,
      userData: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.stateTimeout = this.stateTimeout.bind(this);
    this.apiSearch = this.apiSearch.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.searchAll = this.searchAll.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
    this.allUsers = this.allUsers.bind(this);
    this.searchOne = this.searchOne.bind(this);
    this.oneUser = this.oneUser.bind(this);
  }

  allUsers() {
    this.searchAll()
      .then(res =>
        this.setState({
          allUsers: res.allUsers,
          userList: res.userList
        })
      )
      .catch(err => console.log(err));
    console.log(this.state.allUsers);
  }

  searchAll = async () => {
    const res = await fetch('/api/search');
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  };

  oneUser() {
    this.searchOne()
      .then(res =>
        this.setState({ singleUser: res.singleUser, userData: res.userData })
      )
      .catch(err => console.log(err));
    console.log(this.state.userData);
  }

  searchOne = async () => {
    const res = await fetch('/api/search_user?userName=' + this.state.userName);
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  toggleResults() {
    this.setState({ allUsers: false, singleUser: false });
  }

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({
          copied: false,
          googleId: '',
          emailVal: '',
          userName: '',
          role: 'user',
          email: ''
        });
      }, 3000);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateRole(role) {
    this.setState({ role: role });
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
                <select
                  name="role"
                  style={{ textAlign: 'center' }}
                  value={this.state.role}
                  onChange={event => {
                    this.updateRole(event.target.value);
                  }}>
                  <option>user</option>
                  <option>admin</option>
                </select>
              </Center>
              <Center>
                <button
                  //disabled={!this.state.isAdmin}
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
                //disabled={!this.state.isAdmin}
                type="submit"
                className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                onClick={this.oneUser}>
                Search
              </button>
            </Center>
            <br />
            {this.state.singleUser ? (
              <Center>
                <div
                  className="card"
                  style={{ textAlign: 'center', width: '80%' }}>
                  <div className="card-header" style={{ textAlign: 'center' }}>
                    All Users
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Table
                      dark
                      borderless="false"
                      id="userResults"
                      style={{ height: '100%' }}
                      className="mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>GoogleID</th>
                          <th>UserName</th>
                          <th>Role</th>
                          <th>Created</th>
                          <th>Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {this.state.userData.map(function(item, key) {
                            return (
                              <td key={key}>
                                {item.siteId}
                                {item.googleId}
                                {item.userName}
                                {item.role}
                                {item.createdDt}
                                {item.updatedDt}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </Table>
                    <button
                      className="btn btn-sm font-weight-bold btn-outline-dark p-sm-1 mr-sm-1"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        width: '100%',
                        border: 'none'
                      }}
                      onClick={this.toggleResults}>
                      Hide Results
                    </button>
                  </div>
                </div>
              </Center>
            ) : null}
            <br />
            <div className="content-title">
              <h5 style={{ textAlign: 'center' }}>Lookup All</h5>
            </div>
            <br />
            <Center>
              <button
                type="submit"
                className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                onClick={this.allUsers}>
                Search
              </button>
            </Center>
            <br />
            {this.state.allUsers ? (
              <Center>
                <div
                  className="card"
                  style={{ textAlign: 'center', width: '80%' }}>
                  <div className="card-header" style={{ textAlign: 'center' }}>
                    All Users
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Table
                      dark
                      borderless="false"
                      id="userResults"
                      style={{ height: '100%' }}
                      className="mb-0">
                      <thead>
                        <tr>
                          <th>UserName</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.userList.map(function(item, key) {
                          return (
                            <tr key={key}>
                              <td>{item.userName}</td>
                              <td>{item.userRole}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <button
                      className="btn btn-sm font-weight-bold btn-outline-dark p-sm-1 mr-sm-1"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        width: '100%',
                        border: 'none'
                      }}
                      onClick={this.toggleResults}>
                      Hide Results
                    </button>
                  </div>
                </div>
              </Center>
            ) : null}
            <hr />
            <div className="content-title">
              <h5 style={{ textAlign: 'center' }}>Update User</h5>
            </div>
            <form method="PUT">
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
                <select
                  name="role"
                  style={{ textAlign: 'center' }}
                  value={this.state.role}
                  onChange={event => {
                    this.updateRole(event.target.value);
                  }}>
                  <option>user</option>
                  <option>admin</option>
                </select>
              </Center>
              <Center>
                <button
                  //disabled={!this.state.isAdmin}
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

function mapStateToProps({ auth, role }) {
  return { auth, role };
}

export default connect(mapStateToProps)(UserCrud);
