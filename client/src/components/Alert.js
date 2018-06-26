import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class AlertDawg extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }

    this.onCopyAlert = this.onCopyAlert.bind(this)
  }

  onCopyAlert() {
    this.setState({
      visible: true
    })
  }

  render() {
    return (
      <div>
        <div>
          <Alert color="success" isOpen={this.state.visible} toggle={this.onCopyAlert} fade={true}>
            Copied to clipboard!!
        </Alert>
        </div>
      </div>
    )
  }
}



export default AlertDawg;
