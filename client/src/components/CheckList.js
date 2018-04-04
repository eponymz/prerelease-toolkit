import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../css/Header.css';
import '../css/Prerelease.css';
import '../css/bscss.css';

class CheckList extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/"/>;
      default:
        return (
          <div>
            <div
              id="bodyDawg"
              className="container"
              style={{
              display: 'none'
            }}>
              <div className="row">
                <div className="col s12" id="main-card">
                  <div id="main" className="card">
                    <div id="listNameShitz">
                      <div className="card-header text-muted" id="heeder">
                        <h1>Listness</h1>
                      </div>
                      <div className="card-content" id="list-info">
                        <div className="input-field mb-3 col s12">
                          <input
                            type="text"
                            className="form-control"
                            name="list-name"
                            id="listNameInput"/>
                          <label htmlFor="list-name">
                            What's the List For? (optional)
                          </label>
                        </div>
                        <input
                          type="submit"
                          defaultValue="Add List Name"
                          className="btn btn-dark"
                          id="nameBtn"/>
                        <input
                          type="submit"
                          defaultValue="Reset List Name"
                          className="btn btn-danger"
                          id="resetNameBtn"/>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="row">
                        <form id="task-form">
                          <div className="input-field col s12">
                            <input type="text" name="task" id="task"/>
                            <label htmlFor="task">Item</label>
                          </div>
                          <div className="input-field col s12">
                            <input type="text" name="task" id="itemDescription"/>
                            <label htmlFor="task">
                              Item Details (optional)
                            </label>
                          </div>
                          <input type="submit" defaultValue="Add Item" className="btn btn-dark"/>
                        </form>
                      </div>
                    </div>
                    <div className="card-action" id="content">
                      <h5 className="card-header" id="taskTitle">
                        Item Collection
                      </h5>
                      <div className="input-field col s12">
                        <input type="text" name="filter" id="filter"/>
                        <label htmlFor="filter">Filter Items</label>
                      </div>
                      <ul className="collection" id="listContent"/>
                      <input
                        type="submit"
                        defaultValue="Copy List"
                        className="btn btn-dark"
                        id="copyBtn"/>
                      <button type="button" className="clear-tasks btn btn-danger">
                        Clear Item List
                      </button>
                    </div>
                    <div className="card-footer text-muted" id="feeter">
                      By: Ian Sabey
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(CheckList);
