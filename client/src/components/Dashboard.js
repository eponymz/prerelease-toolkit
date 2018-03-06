import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

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
            <h1 style={{ textAlign: 'center' }}>QA Release Sheet</h1>
            <Center>
              <div className="release-center">
                <Center>
                  <iframe
                    title="qa release sheet"
                    src="https://docs.google.com/spreadsheets/d/1EPMAsaNuzEbRlINEquwX3T1uaHtW32OoeBGHnXXSYVI/edit?usp=sharing"
                    width="100%"
                    height="1000px"
                    scrolling="no"
                    frameborder="2px"
                  />
                </Center>
                <div className="relic-left">
                  <p style={{ textAlign: 'center' }}>Risk Rating Legend</p>
                  <Center>
                    <table
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        borderSpacing: '0px'
                      }}
                    >
                      <tr>
                        <th>
                          <h3>Label</h3>
                        </th>
                        <th>
                          <h3>Rating</h3>
                        </th>
                      </tr>
                      <tr>
                        <td>rrr1</td>
                        <td>RED</td>
                      </tr>
                      <tr>
                        <td>rrr2</td>
                        <td>YELLOW</td>
                      </tr>
                      <tr>
                        <td>rrr3</td>
                        <td>GREEN</td>
                      </tr>
                    </table>
                  </Center>
                </div>
              </div>
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

export default connect(mapStateToProps)(Dashboard);
