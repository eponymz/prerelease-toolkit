import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <div className="content-body"><div className="col-sm-5 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4 box-shadow-2">
          <div className="card border-grey border-lighten-3 px-2 row mb-0">
            <div className="card-header no-border pb-1">
              <div className="card-body">
                <h2 className="error-code text-center mb-2">401</h2>
                <h3 className="text-uppercase text-center">Unauthorized</h3>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Unauthorized;
