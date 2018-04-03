import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
//import Center from 'react-center';
//import { CopyToClipboard } from 'react-copy-to-clipboard';
import loading from '../loading.gif';
//import resetForm from './resetForm';
import '../css/Header.css';
import '../css/Prerelease.css';
import '../css/bscss.css';

class LoanCalc extends Component {
  constructor(props) {
    super(props);
    this.calculate = this.calculate.bind(this);
  }

  calculate = () => {
    document
      .getElementById('loan-form')
      .addEventListener('submit', function(e) {
        //hide results
        document.getElementById('results').style.display = 'none';

        // show loader
        document.getElementById('loading').style.display = 'block';

        setTimeout(calculateResults, 2000);

        e.preventDefault();
      });

    function calculateResults() {
      console.log('Calculating...');

      // UI vars
      const loanAmount = document.getElementById('amount');
      const startInterest = document.getElementById('interest');
      const termYears = document.getElementById('years');
      const monthlyPayment = document.getElementById('monthly-payment');
      const totalPayment = document.getElementById('total-payment');
      const totalInterest = document.getElementById('total-interest');

      const principal = parseFloat(loanAmount.value);
      const calculatedInterest = parseFloat(startInterest.value) / 100 / 12;
      const calculatedPayment = parseFloat(termYears.value) * 12;

      // Compute monthly payment
      const x = Math.pow(1 + calculatedInterest, calculatedPayment);
      const monthly = principal * x * calculatedInterest / (x - 1);

      if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = (monthly * calculatedPayment - principal).toFixed(
          2
        );

        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';
      } else {
        showError('Validation Errors With the Form Submission');
      }
    }
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
            <div id="bodyDawg" className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <div className="card card-body text-center mt-5">
                    <h1
                      className="card-header display-5 mb-3"
                      style={{ fontFamily: 'Orbitron' }}
                    >
                      Loan Calculator
                    </h1>
                    <form id="loan-form">
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input
                            type="number"
                            className="form-control"
                            id="amount"
                            placeholder="Loan Amount (to the nearest dollar)"
                          />
                          <span className="input-group-addon">.00</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">%</span>
                          <input
                            className="form-control"
                            id="interest"
                            placeholder="Interest"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          id="years"
                          placeholder="Loan Term In Years"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          onClick={this.calculate}
                          className="btn btn-dark btn-block"
                        >
                          Calculate
                        </button>
                      </div>
                      <div className="card-footer text-muted">
                        By: Ian Sabey
                      </div>
                    </form>
                    {/* LOADER */}
                    <div id="loading" style={{ display: 'none' }}>
                      <img src={loading} />
                    </div>
                    {/* RESULTS */}
                    <div
                      id="results"
                      className="pt-4"
                      style={{ display: 'none' }}
                    >
                      <h5>Results</h5>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            Monthly Payment
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            id="monthly-payment"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            Total Payment Made
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            id="total-payment"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            Total Interest
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            id="total-interest"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="button"
                          defaultValue="Reset"
                          className="btn btn-danger btn-block"
                          onClick={function resetForm() {
                            document.getElementById('results').style.display =
                              'none';
                            document.querySelector(
                              DOMstrings.loanAmount
                            ).value =
                              '';
                            document.querySelector(
                              DOMstrings.startInterest
                            ).value =
                              '';
                            document.querySelector(DOMstrings.termYears).value =
                              '';
                            document.querySelector(
                              DOMstrings.monthlyPayment
                            ).value =
                              '';
                            document.querySelector(
                              DOMstrings.totalPayment
                            ).value =
                              '';
                            document.querySelector(
                              DOMstrings.totalInterest
                            ).value =
                              '';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="alert alert-warning mt-5" role="alert">
                    <p />
                    <center>
                      THIS IS A <b>VERY</b> ROUGH ESTIMATION TO CALCULATE THE
                      MONTHLY PAYMENT AND TOTAL LOAN AMOUNT.<br />THIS TOOL IS
                      NOT EXACT AND SHOULD <b>ONLY</b> BE USED WITH THE ABOVE
                      STATED PRETENCES.{' '}
                    </center>
                    <p />
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

// DOM strings
const DOMstrings = {
  loanAmount: '#amount',
  startInterest: '#interest',
  termYears: '#years',
  monthlyPayment: '#monthly-payment',
  totalPayment: '#total-payment',
  totalInterest: '#total-interest'
};

// show error function
function showError(error) {
  //show results
  document.getElementById('results').style.display = 'none';

  //hide loader
  document.getElementById('loading').style.display = 'none';

  //create div
  const errorDiv = document.createElement('div');

  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.card-header');

  // add a class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 5 seconds
  setTimeout(clearError, 5000);
}

//clear error
function clearError() {
  document.querySelector('.alert').remove();
  document.getElementById('loading').style.display = 'none';
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(LoanCalc);
