import * as api from "Utils/api";
import { Status } from "Models/Status";
import { createAction } from "Models/Action";
import { IMPORT_FROM_EXCHANGE_STATUS } from "./types";
import { showMessage, hideAllMessages, hideMessage } from "Components/GlobalMessage/actions";
const MSG_SIGNIN_FAILED = {};
const MSG_SIGNIN_SUCCESS = {};

export const importFromExchange = () => {
  return (dispatch) => {
    dispatch(createAction(IMPORT_FROM_EXCHANGE_STATUS, Status.createProgressing()));
  };
};

export const confirmSignIn = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(IMPORT_FROM_EXCHANGE_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(IMPORT_FROM_EXCHANGE_STATUS, new Status()));
      dispatch(showMessage('You have signed in successfully!', 'success', MSG_SIGNIN_SUCCESS));
    }, 1000);
  };
};

export const cancelSignIn = () => {
  return (dispatch) => {
    dispatch(createAction(IMPORT_FROM_EXCHANGE_STATUS, new Status()));
  };
};

export const importTradesCredential = (credential: object) => {
  return (dispatch) => {
    dispatch(createAction(IMPORT_FROM_EXCHANGE_STATUS, Status.createLoading()));
    api.importTradesCredential(credential)
      .then(response => {
        dispatch(createAction(IMPORT_FROM_EXCHANGE_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_SIGNIN_FAILED));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_SIGNIN_FAILED));
        dispatch(createAction(IMPORT_FROM_EXCHANGE_STATUS, new Status()));
      });
  };
};

export const resetStatus = () => {
  return (dispatch) => {
    dispatch(createAction(IMPORT_FROM_EXCHANGE_STATUS, new Status()));
  };
};
