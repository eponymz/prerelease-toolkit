import { FETCH_ROLE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ROLE:
      return action.payload || false;
    default:
      return state;
  }
}
