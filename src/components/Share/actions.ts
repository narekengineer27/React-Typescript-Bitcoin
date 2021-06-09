import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';

import {
  MENTOR_PROGRAM_REFERRALS,
  MENTOR_PROGRAM_SET_WALLET_MODAL, 
  MENTOR_PROGRAM_URL,
  FETCH_REFERAL_URL,
  FETCH_REFERAL_URL_ERROR,
  FETCH_REFERAL_URL_SUCCESS,
  FETCH_TOKEN_BALANCE,
  FETCH_TOKEN_BALANCE_SUCCESS,
  FETCH_TOKEN_BALANCE_ERROR

} from './types';

import { hideMessage, showMessage } from 'Components/GlobalMessage/actions';

const MSG_MENTOR_PROGRAM = {};

export const loadReferrals = () => {
  return (dispatch) => {
    dispatch(createAction(MENTOR_PROGRAM_REFERRALS, { status: Status.createLoading() }));
    return api.referrals()
      .then(response => {
        const data = response.data;
        dispatch(createAction(MENTOR_PROGRAM_REFERRALS, { data, status: Status.createSuccess() }));
        dispatch(hideMessage(MSG_MENTOR_PROGRAM));
      })
      .catch(error => {
        dispatch(createAction(MENTOR_PROGRAM_REFERRALS, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_MENTOR_PROGRAM));
      });
  };
};

export const loadUrl = () => {
  return (dispatch) => {
    dispatch(createAction(FETCH_REFERAL_URL, { status: Status.createLoading() }));
    return api.referralUrl()
      .then(response => {
        dispatch(createAction(FETCH_REFERAL_URL_SUCCESS, response));
      })
      .catch(error => {
        dispatch(createAction(FETCH_REFERAL_URL_ERROR, error));
      });
  };
};

export const token_balance = () => {
  return (dispatch) => {
    dispatch(createAction(FETCH_TOKEN_BALANCE, { status: Status.createLoading() }));
    return api.token_balance()
      .then(response => {
        dispatch(createAction(FETCH_TOKEN_BALANCE_SUCCESS, response));
      })
      .catch(error => {
        dispatch(createAction(FETCH_TOKEN_BALANCE_ERROR, error));
      });
  };
};

export const openSetWallet = () => {
  return dispatch => {
    dispatch(createAction(MENTOR_PROGRAM_SET_WALLET_MODAL, { visible: true }));
  };
};

export const closeSetWallet = () => {
  return dispatch => {
    dispatch(createAction(MENTOR_PROGRAM_SET_WALLET_MODAL, { visible: false }));
  };
};

export const submitSetWallet = (walletId: string) => {
  return dispatch => {
    dispatch(setWallet(walletId))
      .then(() => {
        dispatch(loadReferrals())
          .then(() => {
            dispatch(closeSetWallet());
          });
      });
  };
};

export const setWallet = (walletId: string) => {
  return (dispatch) => {
    dispatch(createAction(MENTOR_PROGRAM_SET_WALLET_MODAL, { status: Status.createLoading() }));
    return api.setReferralsWalletId(walletId)
      .then(response => {
        dispatch(createAction(MENTOR_PROGRAM_SET_WALLET_MODAL, { status: Status.createSuccess() }));
        dispatch(hideMessage(MSG_MENTOR_PROGRAM));
      })
      .catch(error => {
        dispatch(createAction(MENTOR_PROGRAM_SET_WALLET_MODAL, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_MENTOR_PROGRAM));
      });
  };
};
