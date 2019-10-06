import history from '../../containers/App/history';

export const LOG_IN = 'LOG_IN';

export const logIn = async (formData) => {
  // eslint-disable-next-line
  console.log(formData);
  history.push('/dashboard');
  return { type: LOG_IN, jwt: (new Date()).getTime() };
};
