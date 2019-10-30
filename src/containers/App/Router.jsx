import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';
import UsersPage from '../Users/index';
import ExamplePageTwo from '../ExampleTwo/index';
import Catalog from '../Catalog/index';

const Pages = () => (
  <Switch>
    <Route path="/pages/users/table" component={UsersPage} />
    <Route path="/pages/users/profile" component={ExamplePageTwo} />
    <Route path="/pages/users/assets" component={Catalog} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/pages" component={Pages} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
