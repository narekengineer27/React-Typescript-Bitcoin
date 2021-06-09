import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { ExchangeAccount } from 'Models/ExchangeAccount';
import { createAction } from 'Models/Action';
import {
  MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS,
  MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS_STATUS,
  MANUAL_TRADING_ROBOT_EXCHANGES,
  MANUAL_TRADING_ROBOT_EXCHANGES_STATUS,
  MANUAL_TRADING_ROBOT_SET_ACTIVE_EXCHANGE_ACCOUNT,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
import { loadActiveExchangeAccountId, saveActiveExchangeAccountId } from 'Utils/persistSettings';

const MSG_EXCHANGE_ACCOUNTS_ERROR = {};
const MSG_EXCHANGES_ERROR = {};

export const setActiveExchangeAccount = (account: ExchangeAccount) => {
  return (dispatch) => {
    if (account) {
      saveActiveExchangeAccountId(account.id);
    }

    dispatch(createAction(MANUAL_TRADING_ROBOT_SET_ACTIVE_EXCHANGE_ACCOUNT, account));
  };
};

export const fetchExchangeAccounts = () => {
  return dispatch => {
    dispatch(createAction(MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS_STATUS, Status.createLoading()));

    return api.exchangeAccounts()
      .then(response => {

        // Try to find the previous active account
        let activeAccount: ExchangeAccount;
        const activeAccountId = loadActiveExchangeAccountId();
        if (activeAccountId) {
          activeAccount = response.data.find(item => item.id === activeAccountId);
        }
        if (!activeAccount && response.data.length > 0) {
          activeAccount = response.data[0];
        }

        dispatch(createAction(MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS, response.data));
        dispatch(createAction(MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_EXCHANGE_ACCOUNTS_ERROR));

        if (activeAccount) {
          dispatch(setActiveExchangeAccount(activeAccount));
        }
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_EXCHANGE_ACCOUNTS_ERROR));
        dispatch(createAction(MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS_STATUS, Status.createError()));
      });
  };
};

export const fetchExchanges = () => {
  return dispatch => {
    dispatch(createAction(MANUAL_TRADING_ROBOT_EXCHANGES_STATUS, Status.createLoading()));

    api.exchanges()
      .then(response => {
        dispatch(createAction(MANUAL_TRADING_ROBOT_EXCHANGES, response.data));
        dispatch(createAction(MANUAL_TRADING_ROBOT_EXCHANGES_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_EXCHANGES_ERROR));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_EXCHANGES_ERROR));
        dispatch(createAction(MANUAL_TRADING_ROBOT_EXCHANGES_STATUS, Status.createError()));
      });
  };
};
