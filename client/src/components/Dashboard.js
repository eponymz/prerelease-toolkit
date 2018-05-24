import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import Center from 'react-center';

import '../App.css'
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
              If you are using this app and you have requests for content, reach
              out to Ian. Learning is good for him. This app is deadended for
              him otherwise, due to not having access to internal content.
            </h3>
            <h3 style={{ textAlign: 'center' }}>
              Here is a button that goes to failarmy. Since ya know, time
              wastin.. shhh I wont tell anyone.
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

            <div className='meta'>
              <Center>
                <a href='https://d1qqkmp2z93k.statuspage.io/'>Status</a>
                <ul>

                </ul>
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

// const fetchThings = async () => {
//   const res = await fetch("https://d1qqkmp2z93k.statuspage.io/api/v2/incidents/unresolved.json?api_key=5bffe5fd-6d1b-484c-8e50-35f83261478d");
//   const json = await res.json();
//   console.log(json.incidents);
//   // console.log(json);
//   const statusArr = json.incidents['0'];
//   const statusList = statusArr.map((statusItem) => <li>{statusItem}</li>);
// };

// fetchThings();

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
