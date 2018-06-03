import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');

  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};

// handles token returned by Stripe after the user purchased some credits
// sends to API to check if credits should be added
export const handleToken = token => async dispatch => {
  const response = await axios.post('/api/stripe', token);

  // fetching the user, since usermodel contains the credit amount
  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};

// test for surveys

export const postSurvey = survey => async dispatch => {
  const response = await axios.post('/api/surveys', survey);

  // fetching the user, since usermodel contains the credit amount
  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};
