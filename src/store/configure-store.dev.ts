import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const enhancer = compose(
  applyMiddleware(thunkMiddleware, createLogger({
    collapsed: true,
  })),
);

export default (preloadedState) => {
  const store = createStore(
    reducers,
    preloadedState,
    enhancer,
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
