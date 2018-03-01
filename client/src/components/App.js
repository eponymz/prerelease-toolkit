import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Login from './Login';
import GoogleButton from './GoogleBtn';
import Welcome from './Welcome';
import Dashboard from './Dashboard';
import Header from './Header';
import JakobReport from './JakobReport';

// const Header = () => <h2>HEADER</h2>;
// const Dashboard = () => <h2>DASHBOARD</h2>;
// const SurveyNew = () => <h2>SURVEY CREATE</h2>;
// const Landing = () => <h2>LANDING</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/survey" component={Dashboard} />
          <Route path="/survey/new" component={SurveyNew} /> */}
          <Route exact path="/" component={Login} />
          <Route exact path="/" component={Welcome} />
          <Route exact path="/" component={GoogleButton} />
          <Route path="/z/" component={Header} />
          <Route path="/z/dashboard" component={Dashboard} />
          <Route path="/z/post-release-report" component={JakobReport} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
