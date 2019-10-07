import history from '../../containers/App/history';
import { login } from '../../api/apiService';

export const LOG_IN = 'LOG_IN';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';

export const logIn = async (formData) => {
  let action = null;
  try {
    // eslint-disable-next-line
    console.log(formData)
    const jwt = await login(formData.name, formData.password);
    history.push('/dashboard');
    action = { type: LOG_IN, jwt };
  } catch (error) {
    action = { type: LOG_IN_ERROR, error };
  }
  return action;
};
