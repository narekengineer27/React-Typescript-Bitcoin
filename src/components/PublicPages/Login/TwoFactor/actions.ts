import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { saveUserToLocal } from 'Utils/auth';
import { createAction } from 'Models/Action';
import { showMessage } from 'Components/GlobalMessage/actions';
import { LOGIN_AUTH } from '../types';
import { TWO_FACTOR_CONFIRM_STATUS } from './types';

const MSG_ERROR = {};

export const confirmCode = (email, password, code) => {
  return (dispatch) => {
    dispatch(createAction(TWO_FACTOR_CONFIRM_STATUS, Status.createLoading()));
    api.verify2faCode({
      email,
      password,
      code,
    }).then(response => {
      const data = response.data || {};
      saveUserToLocal(data);
      dispatch(createAction(LOGIN_AUTH, true));
      dispatch(createAction(TWO_FACTOR_CONFIRM_STATUS, new Status()));
    }).catch(error => {
      dispatch(showMessage(error, 'error', MSG_ERROR));
      dispatch(createAction(TWO_FACTOR_CONFIRM_STATUS, Status.createError()));
    });
  };
};

