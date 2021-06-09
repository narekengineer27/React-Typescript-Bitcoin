import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  ADMIN_REFERRAL_BONUSES_UNPAID,
  ADMIN_REFERRAL_BONUSES_PAID,
  ADMIN_REFERRAL_BONUSES_MARK_PAID
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
import { Meta } from 'Models/Meta';

const MSG_BONUSES = {};
const MSG_MARK_PAID = {};

export const loadUnpaid = (meta = new Meta()) => {
  return (dispatch) => {
    dispatch(createAction(ADMIN_REFERRAL_BONUSES_UNPAID, { status: Status.createLoading() }));
    return api.adminReferralsUsers(meta)
      .then(response => {
        dispatch(hideMessage(MSG_BONUSES));
        dispatch(createAction(ADMIN_REFERRAL_BONUSES_UNPAID,
          { data: response.data, status: Status.createSuccess(), meta: response.meta || new Meta() }));
      })
      .catch(error => {
        dispatch(createAction(ADMIN_REFERRAL_BONUSES_UNPAID, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_BONUSES));
      });
  };
};

export const loadPaid = (meta = new Meta()) => {
  return (dispatch) => {
    dispatch(createAction(ADMIN_REFERRAL_BONUSES_PAID, { status: Status.createLoading() }));
    return api.adminReferralsUsersPaid(meta)
      .then(response => {
        dispatch(hideMessage(MSG_BONUSES));
        dispatch(createAction(ADMIN_REFERRAL_BONUSES_PAID,
          { data: response.data, status: Status.createSuccess(), meta: response.meta || new Meta() }));
      })
      .catch(error => {
        dispatch(createAction(ADMIN_REFERRAL_BONUSES_PAID, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_BONUSES));
      });
  };
};

export const markBonusPaid = (userId: number, lastDate: string) => {
  return (dispatch) => {
    dispatch(createAction(ADMIN_REFERRAL_BONUSES_MARK_PAID, { status: Status.createLoading() }));
    return api.adminReferralsUsersSetPaid(userId, lastDate)
      .then(response => {
        dispatch(hideMessage(MSG_MARK_PAID));
        dispatch(createAction(ADMIN_REFERRAL_BONUSES_MARK_PAID, { status: Status.createSuccess(), }));
      })
      .catch(error => {
        dispatch(createAction(ADMIN_REFERRAL_BONUSES_MARK_PAID, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_MARK_PAID));
      });
  };
};
