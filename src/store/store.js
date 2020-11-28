import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import userReducer from "./reducers/userReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  users: userReducer,
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