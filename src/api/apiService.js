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

let fakedData = [{
  id: 1, name: 'A', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 3, name: 'B', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
},
{
  id: 4, name: 'C', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 5, name: 'D', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
},
{
  id: 6, name: 'E', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 7, name: 'F', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
},
{
  id: 8, name: 'G', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 9, name: 'H', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
},
{
  id: 10, name: 'I', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 11, name: 'J', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 13, name: 'K', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
},
{
  id: 14, name: 'L', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 15, name: 'M', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
},
{
  id: 16, name: 'N', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 17, name: 'O', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
},
{
  id: 18, name: 'P', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
{
  id: 19, name: 'Q', calories: 560, carbs: 5.7, fat: 100, protein: 19.3,
},
{
  id: 20, name: 'R', calories: 305, carbs: 3.7, fat: 67, protein: 4.3,
},
];

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
  const i = sortData.field;
  const score = e => (Number.isInteger(e[i]) ? e[i] : String(e[i]).charCodeAt());
  const pa = score(a);
  const pb = score(b);
  return (pb - pa) * (sortData.direction === 'desc' ? -1 : 1);
};

export const getUsers = async (page, limit, order) => ({
  data: fakedData.sort(withSortData(order)).slice(page * limit, (page * limit) + limit),
  order,
  page,
  limit,
  total: 20,
});

export const deleteUser = async (ids) => {
  fakedData = fakedData.filter(({ id }) => !ids.includes(id));
};
