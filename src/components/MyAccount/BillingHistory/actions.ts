import * as api from 'Utils/api';
import * as _ from 'lodash';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { BillingHistoryEntry } from 'Models/BillingHistoryEntry';

import {
  BILLING_HISTORY,
  BILLING_HISTORY_STATUS,
} from './types';

import { hideMessage, showMessage } from 'Components/GlobalMessage/actions';

const MSG_BILLING_HISTORY = {};

export const loadBillingHistory = () => {
  return (dispatch) => {
    dispatch(createAction(BILLING_HISTORY_STATUS, Status.createLoading()));
    api.billingHistory()
      .then(response => {
        const data: BillingHistoryEntry[] = _.get(response, 'data', {});
        dispatch(createAction(BILLING_HISTORY, data));
        dispatch(createAction(BILLING_HISTORY_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_BILLING_HISTORY));
      })
      .catch(error => {
        dispatch(createAction(BILLING_HISTORY_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_BILLING_HISTORY));
      });
  };
};
