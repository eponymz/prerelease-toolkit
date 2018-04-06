import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Header from './Header';
// import Bash from './Terminal';
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

// const Header = () => <h2>HEADER</h2>; const Dashboard = () =>
// <h2>DASHBOARD</h2>; const SurveyNew = () => <h2>SURVEY CREATE</h2>; const
// Landing = () => <h2>LANDING</h2>;

class App extends Component {
  componentDidMount() {
    this
      .props
      .fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/survey" component={Dashboard} />
          <Route path="/survey/new" component={SurveyNew} /> */}
          <Route exact path="/" component={Login}/>
          <Route path="/z/" component={Header}/>
          <Route path="/z/dashboard" component={Dashboard}/>
          <Route exact path="/z/pre-release" component={PreRelic}/>
          <Route exact path="/z/pre-release" component={PreSheets}/> {/* <Route path="/z/terminal" component={Bash} /> */}
          <Route exact path="/z/dockin-it" component={DockNation}/>
          <Route path="/z/utilities" component={Utilities}/>
          <Route exact path="/z/utilities/loan-calculator" component={BackUtil}/>
          <Route exact path="/z/utilities/loan-calculator" component={LoanCalc}/>
          <Route path="/z/pre-release/results" component={CollapseBtn}/>
          <Route exact path="/z/pre-release/results" component={Results}/>
          <Route path="/z/pre-release/qa-sheet" component={CollapseBtn}/>
          <Route exact path="/z/pre-release/qa-sheet" component={QASheet}/>
          <Route exact path="/z/pre-release/operator" component={CollapseBtn}/>
          <Route exact path="/z/pre-release/operator" component={Operator}/>
          <Route exact path="/z/pre-release/borrower" component={CollapseBtn}/>
          <Route exact path="/z/pre-release/borrower" component={Borrower}/>
          <Route exact path="/z/pre-release/activities" component={CollapseBtn}/>
          <Route exact path="/z/pre-release/activities" component={Activities}/>
          <Route exact path="/z/pre-release/dockinit" component={CollapseBtn}/>
          <Route exact path="/z/pre-release/dockinit" component={DockNation}/>
          <Route path="/" component={Footer}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
