import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

// this is test
const survey = {
	title: 'title',
	subject: 'subject',
	recipients: 'oleonortt@gmail.com',
	body: 'body of email'
};

const SurveyNew = (props) => (
  <div>
    <h2>New Surveys</h2>
    <button onClick={() => props.postSurvey(survey)}>Post survey</button>
  </div>
);

const PostSurvey = connect(null, actions)(SurveyNew);
// end of test

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route exact path='/surveys/new' component={PostSurvey} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
