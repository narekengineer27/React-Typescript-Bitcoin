import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
);

export default (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer,
  );
  return store;
};
