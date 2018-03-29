import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
import '../css/Header.css';
import '../css/Prerelease.css';

class IanSmoke extends Component {
  constructor(props) {
    super(props);
    this.fetchIan = this.fetchIan.bind(this);
  }

  fetchIan = async () => {
    const res = await fetch(
      'http://slick.sofitest.com/api/projects/byname/isabey_initiated',
      {
        method: 'GET'
      }
    );
    const json = await res.json();
    console.log(json.releases['0'].builds);
    // console.log(json);
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
            <div>
              <Center>
                <button className="relic-button" onClick={this.fetchIan}>
                  PULL THEM TESTS!!
                </button>
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(IanSmoke);
