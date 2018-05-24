import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

var sp = new StatusPage.page({ page: 'd1qqkmp2z93k' });

sp.summary({
  success: function (data) {
    // adds the text description to the dropdown
    $('.color-description').text(data.status.description);
    // appends the status indicator as a class name so we can use the right color for the status light thing
    $('.color-dot').addClass(data.status.indicator);
  }
});

// class statusWidget extends Component {
//   renderContent() {
//     switch (this.props.auth) {
//       case null:
//         return;
//       case false:
//         return <Redirect to="/" />;
//       default:
//         return (
//           <div></div>
//         );
//     }
//   }

//   render() {
//     return <div>{this.renderContent()}</div>;
//   }
// }

// function mapStateToProps({ auth }) {
//   return { auth };
// }
// connect(mapStateToProps)
export default (statusWidget);
