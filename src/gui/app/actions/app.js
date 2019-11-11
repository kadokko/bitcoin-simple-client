import { createErrorAction } from 'gui/app/actions/Creator';
import * as types from './app-types';


export const createError = (error) =>
  createErrorAction(
    types.REDUCER_RECEIVE_SYSTEM_ERROR,
    error,
  );

export const resetErrorMessage = () =>
  createErrorAction(
    types.REDUCER_RESET_ERROR_MESSAGE, {
      code: '',
      message: '',
    },
  );
