import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';

import {
  MENTOR_PROGRAM_REFERRALS,
  MENTOR_PROGRAM_SET_WALLET_MODAL, MENTOR_PROGRAM_URL,
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
    dispatch(createAction(MENTOR_PROGRAM_URL, { status: Status.createLoading() }));
    return api.referralUrl()
      .then(response => {
        const url = `${window.location.protocol}//${window.location.host}/#/signup/${response.data.url}`;
        dispatch(createAction(MENTOR_PROGRAM_URL, { data: url, status: Status.createSuccess() }));
        dispatch(hideMessage(MSG_MENTOR_PROGRAM));
      })
      .catch(error => {
        dispatch(createAction(MENTOR_PROGRAM_URL, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_MENTOR_PROGRAM));
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
