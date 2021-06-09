import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  MAIN_HEADER_SIGN_OUT,
  MAIN_HEADER_SIGN_OUT_STATUS,
} from 'Components/MainHeader/types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_SIGNOUT_ERROR = {};

export const signOut = () => {
  return (dispatch) => {
    dispatch(createAction(MAIN_HEADER_SIGN_OUT, localStorage.getItem('user')));
    api.signOut().then(() => {
      api.signOutLocal();
      dispatch(createAction(MAIN_HEADER_SIGN_OUT_STATUS, Status.createSuccess()));
      dispatch(hideMessage(MSG_SIGNOUT_ERROR));
    }).catch((error) => {
      api.signOutLocal();
      dispatch(showMessage(error, 'error', MSG_SIGNOUT_ERROR));
    });
  };
};

export const resetStatus = () => {
  return (dispatch) => {
    dispatch(createAction(MAIN_HEADER_SIGN_OUT_STATUS, new Status()));
  };
};
