import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
// import Center from 'react-center';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import CurlButton from '../pageComponents/CurlButton';
import JakobButtons from '../pageComponents/JakobButtons';
import ActivityCurl from '../pageComponents/ActivityCurl';
import KafkaCreate from '../pageComponents/KafkaCreate';
import CatVersion from '../pageComponents/CatVersion';

class MiscDockz extends Component {
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
              <h3 style={{ textAlign: 'center' }}>Misc. Docker Commands</h3>
              <p style={{ textAlign: 'center' }}>
                Miscellanious commands to paste in terminal when working with an
                environment.
              </p>
            </div>
            <hr />
            <ActivityCurl />
            <hr />
            <CurlButton />
            <hr />
            <JakobButtons />
            <hr />
            <KafkaCreate />
            <hr />
            <CatVersion />
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

export default connect(mapStateToProps)(MiscDockz);
