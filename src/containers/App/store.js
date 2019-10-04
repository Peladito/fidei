import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import promiseMiddleware from 'redux-promise';
import { sidebarReducer, themeReducer, apiReducer } from '../../redux/reducers/index';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  api: apiReducer,
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;
