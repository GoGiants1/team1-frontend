import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import userReducer from "../feature/userSlice"; // redux-toolkit 적용하면서 수정됨

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: userReducer,
  // posts: postReducer,
  router: connectRouter(history),
});

const logger = store => next => action => {
  return next(action);
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const middlewares = [logger,thunk, routerMiddleware(history)];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;


// import {configureStore} from '@reduxjs/toolkit';
// import userReducer from "../feature/userSlice";
// import { createBrowserHistory } from 'history';

// export const history = createBrowserHistory();


// export default configureStore({
//   reducer:{
//     user: userReducer
//   },
// })