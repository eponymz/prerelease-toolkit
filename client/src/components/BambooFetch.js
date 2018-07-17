import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Center from 'react-center';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

//const branchList = document.getElementById('branchList');

class BambooFetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      branches: JSON.parse(localStorage.getItem('branches'))
    };

    this.getBranches = this.getBranches.bind(this);
  }

  componentWillMount() {
    this.getBranches();
  }

  componentDidMount() {
    let branches = this.getBranches.branches;
    this.setState({ branches: [branches] });
    console.log(this.state.branches);
  }

  componentWillUnmount() {
    this.getBranches();
    let branches = this.getBranches.branches;
    this.setState({ branches: [branches] });
    console.log(this.state.branches);
  }

  getBranches() {
    let branches;
    if (localStorage.getItem('branches') === null) {
      branches = [];
    } else {
      branches = [JSON.parse(localStorage.getItem('branches'))];
    }
    return branches;
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
            <div id="bullShit">
              <Center
                name="ticketShit"
                className="card mt-4 card-body"
                style={{
                  flexFlow: 'row wrap'
                }}
                id="branchList"
              />
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

export default connect(mapStateToProps)(BambooFetch);
