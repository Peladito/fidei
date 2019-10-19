import { UnauthenticatedError } from './errors';

class User {
  constructor(credential) {
    this.credential = credential;
  }

  async getProfile() {
    this.profile = {
      name: 'FakeName',
      surname: 'FakeLastname',
      email: 'fake@email.com',
    };
    return this.profile;
  }
}


export const login = async (username, password) => {
  if (username === 'admin' && password === '1234') {
    // eslint-disable-next-line
    console.log('logged');
    return new User((new Date()).getTime());
  }
  throw new UnauthenticatedError();
};

export const logout = async () => {
  // eslint-disable-next-line
  console.log('logged out');
};

const withSortData = sortData => (a, b) => {
  if (sortData.direction === 'desc') {
    return a[sortData.field] - b[sortData.field];
  }
  return b[sortData.field] - a[sortData.field];
};
export const getUsers = async (page, limit, order) => ({
  data: [{
    id: 1, name: 'Cupcake', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
  },
  {
    id: 2, name: 'Flan', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
  },
  ].sort(withSortData(order)),
  order,
  page,
  limit,
  handleClick: () => ({}),
  handlePaginate: () => ({}),
});
