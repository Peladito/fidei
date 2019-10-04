import { LOG_IN } from '../actions/apiActions';

export default function login(state = [], action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, { jwt: action.jwt });
    default:
      return state;
  }
}
