import * as api from 'Utils/api';
import { User } from 'Models/User';
import { saveUserToLocal } from 'Utils/auth';
import { createAction } from 'Models/Action';
import {
  LOGIN_LOGIN,
  LOGIN_AUTH,
  LOGIN_STATUS,
  LOGIN_TWO_FACTOR_ENABLED,
  // LOGIN_TWO_FACTOR_STATUS,
  // LOGIN_TWO_FACTOR_CODE,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';

const env = require('Root/env.json');
const MSG_LOGIN_FAILED = {};
const MSG_SUCCESS = {};

export const login = (user: User) => {
  return (dispatch) => {
    dispatch(createAction(LOGIN_LOGIN, user));

    return api.login(user.email, user.password)
      .then(response => {
        const data = response.data || {};
        if (data.user.user_photo != null) {
          data.user.user_photo = env.imageUrl + data.user.user_photo;
        }
        if (data.enabled_2fa) {
          dispatch(createAction(LOGIN_TWO_FACTOR_ENABLED, data.enabled_2fa));
          dispatch(showMessage(data.message, 'info', MSG_SUCCESS));
        } else {
          saveUserToLocal(data);
          dispatch(createAction(LOGIN_AUTH, true));
          dispatch(hideMessage(MSG_LOGIN_FAILED));
        }
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_LOGIN_FAILED));
        dispatch(createAction(LOGIN_STATUS, { loading: false }));
      });
  };
};

export const resetStatus = () => {
  return (dispatch) => {
    dispatch(createAction(LOGIN_AUTH, false));
    dispatch(createAction(LOGIN_TWO_FACTOR_ENABLED, false));
  };
};
