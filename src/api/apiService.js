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
  id: 1, name: 'Gerardo', surname: 'Perez', age: 35, email: 'gerardo@gmail.com',
},
{
  id: 2, name: 'Andres', surname: 'Reyes', age: 56, email: 'andres.reyes@gmail.com',
},
{
  id: 3, name: 'Andres', surname: 'Reynoso', age: 43, email: 'andres.reynoso@gmail.com',
},
{
  id: 4, name: 'Joaquin', surname: 'Altavista', age: 30, email: 'altavista90@gmail.com',
},
{
  id: 5, name: 'Claudio', surname: 'Gallo', age: 70, email: 'tira.la.bola@gmail.com',
},
{
  id: 6, name: 'Mercedes', surname: 'Gonzales', age: 44, email: 'merchu.g@gmail.com',
},
{
  id: 7, name: 'Veronica', surname: 'Aviles', age: 26, email: 'veroa@gmail.com',
},
{
  id: 8, name: 'Zulema', surname: 'Menem', age: 66, email: 'menem@gmail.com',
},
{
  id: 9, name: 'Jenifer', surname: 'Lopez', age: 36, email: 'jlo@gmail.com',
},
{
  id: 10, name: 'Rafael', surname: 'Zanguango', age: 19, email: 'skere@gmail.com',
},
{
  id: 11, name: 'Rodrigo', surname: 'Yaniez', age: 41, email: 'roya@gmail.com',
},
{
  id: 12, name: 'Jesus', surname: 'Cruz', age: 33, email: 'saviour@gmail.com',
},
{
  id: 13, name: 'Ala', surname: 'Merd', age: 56, email: 'caca@gmail.com',
},
{
  id: 14, name: 'Tiziano', surname: 'Verguero', age: 66, email: 'tizi.vergero@gmail.com',
},
{
  id: 15, name: 'Gabriel', surname: 'Kurtman', age: 40, email: 'humo@gmail.com',
},
{
  id: 16, name: 'Pedro', surname: 'Pereyra', age: 21, email: 'p.p@gmail.com',
},
{
  id: 17, name: 'Andres', surname: 'Pereyra', age: 23, email: 'a.p@gmail.com',
},
{
  id: 18, name: 'Jonas', surname: 'Pereyra', age: 25, email: 'j.p@gmail.com',
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

const whereItemsHave = searchString => item => (searchString.length > 2
  ? Object.values(item).join('').search(new RegExp(searchString, 'i')) > -1 : true);

export const getUsers = async (page, limit, order, searchWords = '') => ({
  data: fakedData.filter(whereItemsHave(searchWords)).sort(withSortData(order))
    .slice(page * limit, (page * limit) + limit),
  order,
  page,
  limit,
  total: 20,
});

export const deleteUser = async (ids) => {
  fakedData = fakedData.filter(({ id }) => !ids.includes(id));
};
