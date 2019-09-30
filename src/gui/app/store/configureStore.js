import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import rootReducer from '../reducers/root';
import rootSaga from '../saga/root';


const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(
      sagaMiddleware,
      // logger,
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();
