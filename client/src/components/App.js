import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Header from './Header';
//import Bash from './Terminal';
import Operator from './Operator';
import CollapseBtn from './CollapseBtn';
import Borrower from './Borrower';
import Activities from './Activities';
import PreRelic from './PreRelic';
import PreSheets from './PreSheets';
import Results from './Results';
import QASheet from './BryanRelease';
import DockNation from './DockNation';
import LoanCalc from './LoanCalc';
import BackUtil from './CollapseUtils';
import Utilities from './Utilities';
import MiscDockz from './MiscDockz';
import Unauthorized from './Unauthorized';
import UserCrud from './UserCrud';
import OpsUtilities from './OpsUtilities';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchRole();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/z/" component={Header} />
          <Route path="/z/dashboard" component={Dashboard} />
          <Route exact path="/z/pre-release" component={PreRelic} />
          <Route exact path="/z/pre-release" component={PreSheets} />
          <Route exact path="/z/dockin-it" component={DockNation} />
          <Route exact path="/z/misc-dockz" component={MiscDockz} />
          <Route path="/z/utilities" component={Utilities} />
          <Route path="/z/ops-utilities" component={OpsUtilities} />
          {/* <Route path="/z/eng-utilities" component={EngUtilities} /> */}
          <Route
            exact
            path="/z/utilities/loan-calculator"
            component={BackUtil}
          />
          <Route
            exact
            path="/z/utilities/loan-calculator"
            component={LoanCalc}
          />
          <Route path="/z/pre-release/results" component={CollapseBtn} />
          <Route exact path="/z/pre-release/results" component={Results} />
          <Route path="/z/pre-release/qa-sheet" component={CollapseBtn} />
          <Route exact path="/z/pre-release/qa-sheet" component={QASheet} />
          <Route exact path="/z/pre-release/operator" component={CollapseBtn} />
          <Route exact path="/z/pre-release/operator" component={Operator} />
          <Route exact path="/z/pre-release/borrower" component={CollapseBtn} />
          <Route exact path="/z/pre-release/borrower" component={Borrower} />
          <Route
            exact
            path="/z/pre-release/activities"
            component={CollapseBtn}
          />
          <Route
            exact
            path="/z/pre-release/activities"
            component={Activities}
          />
          <Route exact path="/z/pre-release/dockinit" component={CollapseBtn} />
          <Route exact path="/z/pre-release/dockinit" component={DockNation} />
          <Route exact path="/z/crud" component={UserCrud} />
          <Route exact path="/unauthorized" component={Unauthorized} />
          <Route path="/" component={Footer} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
