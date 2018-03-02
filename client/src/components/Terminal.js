import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Terminal from 'react-bash';
import Center from 'react-center';
import '../css/Header.css';

class Bash extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return (
          <div className="content-title">
            <h1 style={{ textAlign: 'center' }}>BASH COMMANDS</h1>
            <h3 style={{ textAlign: 'center' }}>
              Not yet hooked to local path
            </h3>
            <Center>
              <Terminal
                prefix="triage@default"
                theme="dark"
                styles={{
                  prefix: {
                    marginRight: '5px',
                    color: '#5b65fb'
                  },
                  header: {
                    backgroundColor: '#000',
                    borderBottom: '1px solid rgb(91,101,251)',
                    padding: '5px 10px 0'
                  },
                  ReactBash: {
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: '13px',
                    fontWeight: '400',
                    height: '1000px',
                    width: '1200px',
                    overflow: 'hidden',
                    textAlign: 'left',
                    border: '1px solid rgb(91,101,251)',
                    backgroundColor: 'rgb(50,50,50)'
                  },
                  redCircle: {
                    backgroundColor: '#ff4b5a',
                    borderRadius: '50%',
                    display: 'inline-block',
                    height: '15px',
                    marginRight: '5px',
                    width: '15px'
                  },
                  yellowCircle: {
                    backgroundColor: '#ffbe46',
                    borderRadius: '50%',
                    display: 'inline-block',
                    height: '15px',
                    marginRight: '5px',
                    width: '15px'
                  },
                  greenCircle: {
                    backgroundColor: '#a5ff5a',
                    borderRadius: '50%',
                    display: 'inline-block',
                    height: '15px',
                    marginRight: '5px',
                    width: '15px'
                  }
                }}
              />
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

export default connect(mapStateToProps)(Bash);
