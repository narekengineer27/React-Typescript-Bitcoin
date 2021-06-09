import * as api from 'Utils/api';
import { CMBSettings } from 'Models/CMBSettings';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  SETTING_INFORMATION_SAVE,
  SETTING_INFORMATION_GET,
  SETTING_INFORMATION_SAVE_SUCCESS,
  SETTING_INFORMATION_STATUS,
  SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS,
  SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS,
  SETTING_ACCONTS_ACCOUNTS,
  SETTING_ACCONTS_STATUS,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';

const MSG_ERROR = {};

export const fetchExchangeAccounts = () => {
  return (dispatch) => {
    dispatch(createAction(SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS, Status.createLoading()));
    api.exchangeAccounts()
      .then(response => {
        const data = response.data;
        dispatch(createAction(SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS, data));
        dispatch(createAction(SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS, Status.createSuccess()));
      });
  };
};

export const saveSettings = (CMBSettings: CMBSettings) => {
  return (dispatch) => {
    dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createLoading()));
    dispatch(createAction(SETTING_INFORMATION_SAVE, CMBSettings));
    return api.saveCMBSettings(CMBSettings)
      .then(response => {
        dispatch(createAction(SETTING_INFORMATION_SAVE_SUCCESS, null));
        dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createSuccess()));
        dispatch(showMessage('CMB Settings updated successfully.', 'success', MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const saveWithdrawal = (values) => {
  return (dispatch) => {
    dispatch(createAction(SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS, Status.createProgressing()));
    const accounts = {};
    Object.keys(values).forEach(fieldName => {
      const split = fieldName.split('__');
      const id = split[0];
      if (accounts.hasOwnProperty(id)) {
        accounts[id][split[1]] = values[fieldName];
      } else {
        accounts[id] = { [split[1]]: values[fieldName] };
      }
    });

    return Promise.all(Object.keys(accounts).map(id => (api.saveRobotSettings(id, accounts[id]))))
      .then(response => {
        dispatch(createAction(SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_ERROR));
        dispatch(showMessage('Withdrawal settings are updated successfully.', 'success', MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const getCurrentSettings = () => {
  return (dispatch) => {
    dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createLoading()));
    dispatch(createAction(SETTING_INFORMATION_GET, null));
    api.getCMBSettings()
      .then(response => {
        const data = response.data;
        dispatch(createAction(SETTING_INFORMATION_GET, data));
        dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createSuccess()));
      })
      .catch(error => {
        dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const fetchAccounts = () => {
  return (dispatch) => {
    dispatch(createAction(SETTING_ACCONTS_STATUS, Status.createLoading()));
    api.exchangeAccounts()
      .then(response => {
        const data = response.data;
        dispatch(createAction(SETTING_ACCONTS_ACCOUNTS, data));
        dispatch(createAction(SETTING_ACCONTS_STATUS, Status.createSuccess()));
      });
  };
};
