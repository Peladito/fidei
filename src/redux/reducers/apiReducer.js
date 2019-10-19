import {
  LOG_IN,
  LOG_OUT,
  LOG_IN_ERROR,
  FETCH_USERS,
} from '../actions/apiActions';

export default function (state = [], action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, { user: action.user, loginError: null });
    case LOG_IN_ERROR:
      return Object.assign({}, state, { loginError: action.error });
    case LOG_OUT:
      delete newState.user;
      return newState;
    case FETCH_USERS:
      return Object.assign({}, state, { tabulatedSource: action.data });
    default:
      return state;
  }
}
