import * as api from 'Utils/api';
import * as _ from 'lodash';
import { User } from 'Models/User';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import {
  ACCOUNT_INFORMATION_STATUS,
  ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION,
  ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS,
  ACCOUNT_INFORMATION_TWO_FACTOR_STATUS,
  ACCOUNT_INFORMATION_TWO_FACTOR_ENABLED
} from './types';
import { showMessage, hideMessage, hideAllMessages } from 'Components/GlobalMessage/actions';

const MSG_ERROR = {};
const MSG_SUCCESS = {};

export const saveProfile = (user:User, enabled_2fa) => {
  return (dispatch) => {
    dispatch(createAction(ACCOUNT_INFORMATION_STATUS, Status.createLoading()));
    api.saveAccountSettings(user)
      .then(response => {
        const data = _.get(response, 'data', {});
        const { city, country, currency, email, name, phone } = data;
        localStorage.setItem('user', JSON.stringify({ city, country, currency, email, name, phone }));
        dispatch(createAction(ACCOUNT_INFORMATION_STATUS, Status.createSuccess()));
        dispatch(showMessage('Account settings updated successfully.', 'success', MSG_SUCCESS));
      })
      .catch(error => {
        dispatch(createAction(ACCOUNT_INFORMATION_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
    if (!enabled_2fa) {
      api.saveTwoFactor(0)
        .catch(error => {
          dispatch(showMessage(error, 'error', MSG_ERROR));
        });
    }
  };
};

export const update2faRules = (rules) => {
  return (dispatch) => {
    dispatch(createAction(ACCOUNT_INFORMATION_TWO_FACTOR_STATUS, Status.createLoading()));
    const approach = rules.enabled_2fa ? +(rules.two_factor_approach || 1) : 0;
    if (+approach < 3) {
      api.saveTwoFactor(approach)
        .then(response => {
          dispatch(createAction(ACCOUNT_INFORMATION_TWO_FACTOR_STATUS, Status.createSuccess()));
          dispatch(showMessage('Your 2FA settings have been updated successfully.', 'success', MSG_SUCCESS));
        })
        .catch(error => {
          dispatch(createAction(ACCOUNT_INFORMATION_TWO_FACTOR_STATUS, Status.createError()));
          dispatch(showMessage(error, 'error', MSG_ERROR));
        });
    }
  };
};

export const usersQr = () => {
  return (dispatch) => {
    dispatch(createAction(ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS, Status.createLoading()));
    api.getGaQr()
      .then(response => {
        dispatch(createAction(ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION, response.data));
        dispatch(createAction(ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS, Status.createSuccess()));
      })
      .catch(error => {
        dispatch(createAction(ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const loadUserInfo = () => {
  return (dispatch) => {
    api.getAccountSettings()
      .then(response => {
        dispatch(createAction(ACCOUNT_INFORMATION_TWO_FACTOR_ENABLED, response.data.enabled_2fa));
      });
  };
};

export const confirmGoogleAuthentication = (code, secret) => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS, Status.createLoading()));
    api.verifyGoogleAuthenticationConfirmCode(code, secret)
      .then(response => {
        dispatch(createAction(ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_ERROR));
        dispatch(showMessage('Your 2FA settings have been updated successfully.', 'success', MSG_SUCCESS));
      })
      .catch(error => {
        dispatch(createAction(ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });


  };
};
