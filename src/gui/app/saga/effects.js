import { call, put } from 'redux-saga/effects';
import { createError } from 'gui/app/actions/app';


export const safen = (fn, ...args) =>
  // eslint-disable-next-line func-names
  function* (action) {
    try {
      yield call(fn, ...args.concat(action));
    } catch (error) {
      yield put(createError(error));
    }
  };
