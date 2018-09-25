import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import { Alert } from 'react-alert';
import { Table, Input } from 'reactstrap';

class UserCrud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alphaVal: '',
      term: '',
      definition: '',
      role: 'user',
      copied: false,
      allUsers: false,
      userList: '',
      singleUser: false,
      entryData: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.stateTimeout = this.stateTimeout.bind(this);
    this.apiSearch = this.apiSearch.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
    this.searchOne = this.searchOne.bind(this);
    this.oneUser = this.oneUser.bind(this);
  }

  oneUser() {
    this.searchOne()
      .then(res => {
        this.setState({
          singleUser: res.singleUser,
          entryData: res.entryData
        });
      })
      .catch(err => console.log(err));
  }

  searchOne = async () => {
    const res = await fetch('/api/dict/search?term=' + this.state.term);
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
                  Entry Created!!
                </Alert>
              ) : null}
            </Center>
            <Center>
              {this.state.message ? (
                <Alert
                  color="danger"
                  id="copySuccess"
                  style={{
                    textAlign: 'center',
                    fontFamily: "'Orbitron', sans-serif",
                    width: '50%'
                  }}>
                  {this.state.term} Not Found!!
                </Alert>
              ) : null}
            </Center>
            {this.props.role === 'admin' || this.props.role === 'opsLead' ? (
              <div>
                <div className="content-title">
                  <h5 style={{ textAlign: 'center' }}>Insert Terms</h5>
                </div>
                <br />
                <form action="/api/dict/create" method="POST">
                  <Center>
                    <input
                      name="alphaVal"
                      style={{ textAlign: 'center' }}
                      placeholder="Alphabet Value"
                      value={this.state.alphaVal}
                      onChange={this.handleChange}
                    />
                  </Center>
                  {/* <br /> */}
                  <Center>
                    <input
                      name="term"
                      style={{ textAlign: 'center' }}
                      placeholder="Term"
                      value={this.state.term}
                      onChange={this.handleChange}
                    />
                  </Center>

                  <Center>
                    <p>Definition</p>
                  </Center>

                  <Center>
                    <Input
                      name="definition"
                      type="textarea"
                      style={{ textAlign: 'center', width: '80%' }}
                      value={this.state.definition}
                      onChange={this.handleChange}
                    />
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
              </div>
            ) : null}
            <div className="content-title">
              <h5 style={{ textAlign: 'center' }}>Search By Term</h5>
            </div>
            <br />
            <Center>
              <input
                name="term"
                style={{ textAlign: 'center' }}
                placeholder="Term"
                value={this.state.term}
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
                          <th>Term</th>
                          <th>Definition</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {this.state.entryData.map(function(item, key) {
                            return (
                              <td key={key}>
                                {item.term}
                                {item.definition}
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
