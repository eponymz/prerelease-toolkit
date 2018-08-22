import axios from 'axios';
import { FETCH_USER, FETCH_ROLE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const fetchRole = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_ROLE,
    payload: res.data.role
  });
};
