import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Login from './pageComponents/Login';
import Footer from './pageComponents/Footer';
import Dashboard from './pages/Dashboard';
import Header from './pageComponents/Header';
import DockNation from './pages/DockNation';
import LoanCalc from './pageComponents/LoanCalc';
import BackUtil from './pageComponents/CollapseUtils';
import Utilities from './pages/Utilities';
import MiscDockz from './pages/MiscDockz';
import UserCrud from './pages/UserCrud';
import OpsUtilities from './pages/OpsUtilities';
import OpsCrud from './pages/OpsCrud';

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
          <Route exact path="/z/dockin-it" component={DockNation} />
          <Route exact path="/z/misc-dockz" component={MiscDockz} />
          <Route path="/z/utilities" component={Utilities} />
          <Route path="/z/ops-utilities" component={OpsUtilities} />
          <Route path="/z/ops-crud" component={OpsCrud} />
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
          <Route exact path="/z/crud" component={UserCrud} />
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
