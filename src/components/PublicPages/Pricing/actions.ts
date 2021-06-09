import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  PUBLIC_PRICING_PACKAGES,
  IState,
} from './types';
import * as api from 'Utils/api';
import { hideMessage, showMessage } from 'Components/GlobalMessage/actions';

const MSG_PACKAGES = {};

export const loadPackages = () => {
  return (dispatch, getState) => {
    const packages = (getState().publicPricing as IState).packages;
    if (packages.status.success) {
      return;
    }

    dispatch(createAction(PUBLIC_PRICING_PACKAGES, { status: Status.createLoading() }));

    api.pricing()
      .then(result => {
        dispatch(createAction(PUBLIC_PRICING_PACKAGES, { status: Status.createSuccess(), data: result.data }));
        dispatch(hideMessage(MSG_PACKAGES));
      })
      .catch(err => {
        dispatch(createAction(PUBLIC_PRICING_PACKAGES, { status: Status.createError() }));
        dispatch(showMessage(err, 'error', MSG_PACKAGES));
      });
  };
};
