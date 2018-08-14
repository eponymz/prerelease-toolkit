import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'reactstrap';
import MoreLazy from './MoreLazy';

class Lazy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleId: '',
      emailVal: '',
      copied: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.stateTimeout = this.stateTimeout.bind(this);
    this.logger = this.logger.bind(this);
  }

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({
          copied: false,
          googleId: '',
          emailVal: ''
        });
      }, 3000);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  logger() {
    console.log(
      'Copied DB command to insert: ' +
        this.state.googleId +
        ' - with the email: ' +
        this.state.emailVal
    );
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
                  Copied!!
                </Alert>
              ) : null}
            </Center>
            {/* <div className="content-title">
              <h5 style={{ textAlign: 'center' }}>
                This is for me to be lazy when adding people to my auth DB.
              </h5>
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
              <br />
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
                <CopyToClipboard
                  text={
                    "db.users.insert({googleId: '" +
                    this.state.googleId +
                    "', email: [{ value: '" +
                    this.state.emailVal +
                    "', type: 'account' }], __v: '0'})"
                  }
                  onCopy={this.stateTimeout}>
                  <button
                    type="submit"
                    className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                    onClick={this.logger}>
                    DB Insert
                  </button>
                </CopyToClipboard>
              </Center>
            </form> */}
            <br />
            <MoreLazy />
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

export default connect(mapStateToProps)(Lazy);
