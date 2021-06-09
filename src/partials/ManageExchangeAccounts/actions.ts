import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { ExchangeAccount } from 'Models/ExchangeAccount';
import { fetchExchangeAccounts } from 'Partials/ExchangeAccountsDropdown/actions';
import { Status } from 'Models/Status';
import { showMessage, hideMessage, hideAllMessages } from 'Components/GlobalMessage/actions';
import {
  EXCHANGE_ACCOUNTS_EDIT_ACCOUNT,
  EXCHANGE_ACCOUNTS_MANAGE_ACCOUNTS,
  EXCHANGE_ACCOUNTS_CLOSE,
  EXCHANGE_ACCOUNTS_DELETE_STATUS,
  EXCHANGE_ACCOUNTS_SAVE_STATUS,
  EXCHANGE_ACCOUNTS_CREATE_DIRECTLY,
  EXCHANGE_ACCOUNTS_DELETE_ACCOUNT
} from './types';

const MSG_SAVE_ERROR = {};
const MSG_DELETE_ERROR = {};
const MSG_SUCCESS = {};

export const openManageAccounts = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_MANAGE_ACCOUNTS, {}));
  };
};

export const close = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(EXCHANGE_ACCOUNTS_CLOSE, {}));
  };
};

export const createAccount = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_EDIT_ACCOUNT, {}));
  };
};

export const openCreateAccount = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_CREATE_DIRECTLY));
  };
};

export const editAccount = (account:ExchangeAccount) => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_EDIT_ACCOUNT, account));
  };
};

export const saveAccount = (account:ExchangeAccount) => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_SAVE_STATUS, Status.createLoading()));
    if (account.id === undefined) {
      // New account - create
      api.createExchangeAccount(account)
        .then(() => {
          dispatch(fetchExchangeAccounts()).then(() => {
            dispatch(close());
            dispatch(hideMessage(MSG_SAVE_ERROR));
            dispatch(createAction(EXCHANGE_ACCOUNTS_SAVE_STATUS, Status.createSuccess()));
          });
        })
        .catch(error => {
          dispatch(showMessage(error, 'error', MSG_SAVE_ERROR));
          dispatch(createAction(EXCHANGE_ACCOUNTS_SAVE_STATUS, Status.createError()));
        });
    } else {
      // Edit
      api.updateExchangeAccount(account)
        .then(() => {
          dispatch(fetchExchangeAccounts()).then(() => {
            dispatch(close());
            dispatch(hideMessage(MSG_SAVE_ERROR));
            dispatch(createAction(EXCHANGE_ACCOUNTS_SAVE_STATUS, Status.createSuccess()));
          });
        })
        .catch(error => {
          dispatch(showMessage(error, 'error', MSG_SAVE_ERROR));
          dispatch(createAction(EXCHANGE_ACCOUNTS_SAVE_STATUS, Status.createError()));
        });
    }
  };
};

export const confirmDelete = (account:ExchangeAccount) => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_DELETE_STATUS, {
      loading: true,
      progressing: true,
    }));

    api.deleteExchangeAccount(account.id)
      .then(() => {
        dispatch(fetchExchangeAccounts()).then(() => {
          dispatch(hideMessage(MSG_DELETE_ERROR));
          dispatch(createAction(EXCHANGE_ACCOUNTS_DELETE_STATUS, Status.createSuccess()));
          dispatch(showMessage('You have remove the account successfully', 'success', MSG_SUCCESS));
        });
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_DELETE_ERROR));
        dispatch(createAction(EXCHANGE_ACCOUNTS_DELETE_STATUS, Status.createError()));
      });
  };
};

export const openDelete = (account:ExchangeAccount) => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_DELETE_ACCOUNT, account));
    dispatch(createAction(EXCHANGE_ACCOUNTS_DELETE_STATUS, Status.createProgressing()));
  };
};

export const cancelDelete = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_ACCOUNTS_DELETE_STATUS, new Status()));
  };
};
