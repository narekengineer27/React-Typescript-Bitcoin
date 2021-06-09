import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  EXCHANGE_ACCOUNTS_STATUS,
  EXCHANGE_ACCOUNTS_ADD_NEW_ACCOUNT_STATUS,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_ERROR = {};

export const saveSettings = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_STATUS, Status.createLoading()));
    return api.saveQuestionnaire()
      .then(response => {
        dispatch(hideMessage(MSG_ERROR));
        dispatch(createAction(EXCHANGE_ACCOUNTS_STATUS, Status.createSuccess()));
        dispatch(showMessage('Accounts saved successfully.', 'success', MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(EXCHANGE_ACCOUNTS_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const addNewAccount = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_ADD_NEW_ACCOUNT_STATUS, Status.createProgressing()));
  };
};

export const cancelAddAccount = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_ADD_NEW_ACCOUNT_STATUS, new Status()));
  };
};

export const confirmAddAccount = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_ADD_NEW_ACCOUNT_STATUS, new Status()));
  };
};
