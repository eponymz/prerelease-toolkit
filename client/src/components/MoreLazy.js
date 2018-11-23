import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'reactstrap';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

class MoreLazy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
      commitMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.stateTimeout = this.stateTimeout.bind(this);
  }

  stateTimeout() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false, commitMessage: '' });
      }, 3000);
    });
  }

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
            <div className="content-title">
              <h5 style={{ textAlign: 'center' }}>
                This is just for me to be lazy and type a commit message then
                copy the whole command.
              </h5>
            </div>
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
            <Center>
              <input
                name="commitMessage"
                style={{ textAlign: 'center' }}
                placeholder="Commit Message"
                value={this.state.commitMessage}
                onChange={this.handleChange}
              />
            </Center>
            <Center>
              <CopyToClipboard
                text={
                  "git add . && git merge --squash && git commit -m '" +
                  this.state.commitMessage +
                  "'"
                }
                onCopy={this.stateTimeout}>
                <button
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Copy Commit
                </button>
              </CopyToClipboard>
            </Center>
            <br/>
            <Center>
              <Link
                to={this.props.auth ? '/z/ops-crud' : '/'}
                  className="btn btn-sm font-weight-bold btn-outline-dark border-dark p-sm-1 mr-sm-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  SoFi A to Z
              </Link>
            </Center>
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

export default connect(mapStateToProps)(MoreLazy);
