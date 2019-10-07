import { UnauthenticatedError } from './errors';

export const login = async (username, password) => {
  if (username === 'admin' && password === '1234') {
    // eslint-disable-next-line
    console.log('logged');
    return (new Date()).getTime();
  }
  throw new UnauthenticatedError();
};

export const logout = async (username, password) => {
  if (username === 'admin' && password === '1234') {
    return 'faketoken';
  }
  throw new UnauthenticatedError();
};
