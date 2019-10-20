import history from '../../containers/App/history';
import {
  login, logout, getUsers as fetchUsers, deleteUser,
} from '../../api/apiService';

export const FETCH_USERS = 'FETCH_USERS';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT = 'LOG_OUT';

export const logIn = async (formData) => {
  let action = null;
  try {
    const user = await login(formData.name, formData.password);
    const userProfile = await user.getProfile();
    // eslint-disable-next-line
    console.log(userProfile);
    history.push('/dashboard');
    action = { type: LOG_IN, user };
  } catch (error) {
    action = { type: LOG_IN_ERROR, error };
  }
  return action;
};

export const logOut = async () => {
  let action = null;
  // eslint-disable-next-line
  console.log('userProfile');
  await logout();
  history.push('/');
  action = { type: LOG_OUT };
  return action;
};

export const getUsers = (page, limit, order) => async (dispatch) => {
  let action = null;
  const dataSource = await fetchUsers(page, limit, order);
  action = { type: FETCH_USERS, data: dataSource };
  action.data = Object.assign(action.data, {
    handleSort(property) {
      const sameProperty = property === this.order.field;
      const ascDirection = this.order.direction === 'asc';
      this.order = { field: property, direction: sameProperty && ascDirection ? 'desc' : 'asc' };
      dispatch(getUsers(page, limit, this.order));
    },
    handleClick: () => ({}),
    changePage(newPage) {
      dispatch(getUsers(newPage, limit, order));
    },
    changeLimit(newLimit) {
      dispatch(getUsers(page, newLimit, order));
    },
    async deleteElements(idsArray) {
      await deleteUser(idsArray);
      dispatch(getUsers(page, limit, order));
    },
  });
  dispatch(action);
};
