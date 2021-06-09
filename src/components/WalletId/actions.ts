import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  WALLETID_STATUS,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_SETUP_FAILED = {};

export const walletId = (walletId: string) => {
  return (dispatch) => {
    dispatch(createAction(WALLETID_STATUS, Status.createLoading()));
    api.walletId(walletId)
      .then(response => {
        dispatch(createAction(WALLETID_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_SETUP_FAILED));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_SETUP_FAILED));
        dispatch(createAction(WALLETID_STATUS, new Status()));
      });
  };
};

export const resetStatus = () => {
  return (dispatch) => {
    dispatch(createAction(WALLETID_STATUS, new Status()));
  };
};
