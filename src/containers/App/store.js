import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import {
  sidebarReducer,
  themeReducer,
  apiReducer,
  rtlReducer,
} from '../../redux/reducers/index';


const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  api: apiReducer,
  rtl: rtlReducer,
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware, ReduxThunk));

export default store;
