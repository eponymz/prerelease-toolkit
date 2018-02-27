import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import GoogleButton from './GoogleBtn';

// const Header = () => <h2>HEADER</h2>;
// const Dashboard = () => <h2>DASHBOARD</h2>;
// const SurveyNew = () => <h2>SURVEY CREATE</h2>;
// const Landing = () => <h2>LANDING</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={Login} />
        <Route path="/" component={GoogleButton} />
      </div>
    </BrowserRouter>
  );
};

export default App;
