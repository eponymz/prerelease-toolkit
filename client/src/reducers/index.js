import { combineReducers } from 'redux';
import authReducer from './authReducer';
import roleReducer from './roleReducer';

export default combineReducers({
  auth: authReducer,
  role: roleReducer
});
