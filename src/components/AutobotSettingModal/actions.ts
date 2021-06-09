import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import {
    AUTOBOT_SETTING_REQUEST,
    AUTOBOT_SETTING_REQUEST_FAILURE,
    AUTOBOT_SETTING_REQUEST_SUCCESS,
    EXCHANGE_BALANCE_REQUEST,
    EXCHANGE_BALANCE_REQUEST_FAILURE,
    EXCHANGE_BALANCE_REQUEST_SUCCESS,
    AUTOBOT_TOKEN_BALANCE_REQUEST,
    AUTOBOT_TOKEN_BALANCE_REQUEST_FAILURE,
    AUTOBOT_TOKEN_BALANCE_REQUEST_SUCCESS,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_FAILURE,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_SUCCESS
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';

const MSG_AUTOBOT_SAVE_FAILED = {};

export const saveAutobotSetting = (data) => {
  return (dispatch) => {
    dispatch(createAction(AUTOBOT_SETTING_REQUEST, {}));
    api.setAutobotSetting(data)
        .then(response => {
            dispatch(createAction(AUTOBOT_SETTING_REQUEST_SUCCESS, response));
        })
        .catch(err => {
            dispatch(createAction(AUTOBOT_SETTING_REQUEST_FAILURE, err));
            dispatch(showMessage(err, 'error', MSG_AUTOBOT_SAVE_FAILED));
        });
  };
};

export const fetchExchangeBalance = () => {
    return (dispatch) => {
      dispatch(createAction(EXCHANGE_BALANCE_REQUEST, {}));
      api.getExchangeBalance()
          .then(response => {
              dispatch(createAction(EXCHANGE_BALANCE_REQUEST_SUCCESS, response));
          })
          .catch(err => {
              dispatch(createAction(EXCHANGE_BALANCE_REQUEST_FAILURE, err));
          });
    };
};

export const getTokenBalance = () => {
    return (dispatch) => {
      dispatch(createAction(AUTOBOT_TOKEN_BALANCE_REQUEST, {}));
      api.tokenConfirm('4')
          .then(response => {
              dispatch(createAction(AUTOBOT_TOKEN_BALANCE_REQUEST_SUCCESS, response));
          })
          .catch(err => {
              dispatch(createAction(AUTOBOT_TOKEN_BALANCE_REQUEST_FAILURE, err));
          });
    };
};

export const activateAutobotAccount = (data) => {
    return (dispatch) => {
      dispatch(createAction(ACTIVATE_EXCHANGE_ACCOUNT_REQUEST, {}));
      api.activateAutobotAccount(data)
        .then(response => {
          dispatch(createAction(ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_FAILURE, err));
        });
    };
  };