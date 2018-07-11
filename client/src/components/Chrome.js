import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChromeBackground from './ChromeBackground';

class ChromeShit extends Component {
  constructor(props) {
    super(props);

    this.dispatchClickedALias.bind(this);
  }

  dispatchClickedAlias = () => {
    store.dispatch({ type: 'user-clicked-alias' });
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
            <input type="button" onClick={this.dispatchClickedALias} />
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

export default connect(mapStateToProps)(ChromeShit);
