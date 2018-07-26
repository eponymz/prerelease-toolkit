import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; import Center from 'react-center';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import loading from '../loading.gif';
import Center from 'react-center';
import { Alert } from 'reactstrap';

class DayCalc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };

    this.calculate = this.calculate.bind(this);
    //this.stateTimeout = this.stateTimeout.bind(this);
  }

  // stateTimeout() {
  //   this.setState({ error: true }, () => {
  //     setTimeout(() => {
  //       this.setState({ error: false });
  //     }, 3000);
  //   });
  // }

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
      let month = document.querySelector(DOMstrings.month).value;
      let day = document.querySelector(DOMstrings.day).value;
      let year = document.querySelector(DOMstrings.year).value;
      Date.daysBetween = function(date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.floor(difference_ms / one_day);
      };

      // parse month value as float type and set to date array positions
      switch (parseFloat(month)) {
        case 1:
          month = 0;
          break;
        case 2:
          month = 1;
          break;
        case 3:
          month = 2;
          break;
        case 4:
          month = 3;
          break;
        case 5:
          month = 4;
          break;
        case 6:
          month = 5;
          break;
        case 7:
          month = 6;
          break;
        case 8:
          month = 7;
          break;
        case 9:
          month = 8;
          break;
        case 10:
          month = 9;
          break;
        case 11:
          month = 10;
          break;
        case 12:
          month = 11;
          break;
        default:
          showError(
            'Enter A Date! Im too lazy to fix the recursive bind. Dont fuck up again!'
          );
          return;
      }

      //Set the two dates
      const oldDate = new Date(year, month, day);
      const todayDate = new Date();

      let daysResult = document.querySelector(DOMstrings.daysResult);

      daysResult.value = Date.daysBetween(oldDate, todayDate);

      let html;
      daysResult.value === 1
        ? (html = `<span>${
            daysResult.value
          } DAY BETWEEN <br/> ${oldDate} <br/> and <br/> ${todayDate}</span>`)
        : (html = `<span>${
            daysResult.value
          } DAYS BETWEEN <br/> ${oldDate} <br/> and <br/> ${todayDate}</span>`);

      document.getElementById('outputMessage').innerHTML = html;

      //show results
      document.getElementById('results').style.display = 'block';
      // disable input until form reset completes
      document.querySelector(DOMstrings.month).setAttribute('disabled', '');
      document.querySelector(DOMstrings.year).setAttribute('disabled', '');
      document.querySelector(DOMstrings.day).setAttribute('disabled', '');
      document
        .querySelector(DOMstrings.calcButton)
        .setAttribute('disabled', '');
      //hide loader
      document.getElementById('loading').style.display = 'none';
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
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card card-body text-center mt-5">
                  <h1 className="card-header display-5 mb-3">Day Calculator</h1>
                  <Center>
                    {this.state.error ? (
                      <Alert
                        color="danger"
                        id="error"
                        style={{
                          textAlign: 'center',
                          fontFamily: "'Orbitron', sans-serif"
                        }}>
                        Validation Errors With Form Submission!!
                      </Alert>
                    ) : null}
                  </Center>
                  <form id="loan-form">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          id="month"
                          maxLength="2"
                          min="1"
                          max="12"
                          placeholder="Enter the Month"
                        />
                        <input
                          type="number"
                          className="form-control"
                          id="date"
                          placeholder="Enter the Day"
                        />
                        <input
                          type="number"
                          className="form-control"
                          id="year"
                          placeholder="Enter the Year"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        id="calcButton"
                        onClick={this.calculate}
                        className="btn btn-dark btn-block">
                        Calculate
                      </button>
                    </div>
                    <div className="card-footer text-muted">By: Ian Sabey</div>
                  </form>
                  {/* LOADER */}
                  <div id="loading" style={{ display: 'none' }}>
                    <img src={loading} alt="Loading..." />
                  </div>
                  {/* RESULTS */}
                  <Center>
                    <div
                      id="results"
                      className="pt-4"
                      style={{ display: 'none' }}>
                      <h5>Results</h5>
                      <div className="form-group">
                        <div className="input-group">
                          <div id="outputMessage">
                            <input id="daysResult" disabled />
                          </div>
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
                            document.querySelector(DOMstrings.month).value = '';
                            document.querySelector(DOMstrings.day).value = '';
                            document.querySelector(DOMstrings.year).value = '';
                            // disable input until form reset completes
                            document
                              .querySelector(DOMstrings.month)
                              .removeAttribute('disabled');
                            document
                              .querySelector(DOMstrings.year)
                              .removeAttribute('disabled');
                            document
                              .querySelector(DOMstrings.day)
                              .removeAttribute('disabled');
                            document
                              .querySelector(DOMstrings.calcButton)
                              .removeAttribute('disabled');
                          }}
                        />
                      </div>
                    </div>
                  </Center>
                </div>
                <div className="alert alert-warning mt-5" role="alert">
                  <p />
                  <center>CALCULATE SOME DAYS DAWG!!</center>
                  <p />
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

const DOMstrings = {
  month: '#month',
  day: '#date',
  year: '#year',
  daysResult: '#daysResult',
  loanForm: '#loan-form',
  calcButton: '#calcButton'
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
  errorDiv.setAttribute('id', 'error');

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 5 seconds
  setTimeout(clearError, 5000);
}

//clear error
function clearError() {
  document.getElementById('error').remove();
  document.getElementById('loading').style.display = 'none';
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(DayCalc);
