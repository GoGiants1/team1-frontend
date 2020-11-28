import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {connectRouter} from 'connected-react-router';

import {history, middlewares} from '../store/store';


const getMockReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

export const getMockStore = initialState => {
  const mockReducer = getMockReducer(initialState);
  const rootReducer = combineReducers({
    posts: mockReducer,
    users: mockReducer,
    router: connectRouter(history),
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};