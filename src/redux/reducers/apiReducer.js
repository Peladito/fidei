import { LOG_IN, LOG_IN_ERROR } from '../actions/apiActions';

export default function login(state = [], action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, { jwt: action.jwt });
    case LOG_IN_ERROR:
      return Object.assign({}, state, { loginError: action.error });
    default:
      return state;
  }
}
