import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  ADMIN_BILLING_PACKAGES,
  ADMIN_BILLING_EDIT_PACKAGE_MODAL,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
import { Package } from 'Models/Package';

const MSG_PACKAGES = {};

export const loadPackages = () => {
  return (dispatch) => {
    dispatch(createAction(ADMIN_BILLING_PACKAGES, { status: Status.createLoading() }));
    return api.adminPackages()
      .then(response => {
        dispatch(hideMessage(MSG_PACKAGES));
        dispatch(createAction(ADMIN_BILLING_PACKAGES, { data: response.data, status: Status.createSuccess() }));
      })
      .catch(error => {
        dispatch(createAction(ADMIN_BILLING_PACKAGES, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_PACKAGES));
      });
  };
};

export const openEditPackage = (pack: Package) => {
  return dispatch => {
    dispatch(createAction(ADMIN_BILLING_EDIT_PACKAGE_MODAL, { visible: true, pack, status: new Status() }));
  };
};

export const closeEditPackage = () => {
  return dispatch => {
    dispatch(createAction(ADMIN_BILLING_EDIT_PACKAGE_MODAL, { visible: false, pack: {} }));
  };
};

export const submitEditPackage = (pack: Package) => {
  return dispatch => {
    const apiCalls = [api.adminUpdatePackage(pack)];
    if (pack.is_feature) {
      apiCalls.push(api.adminUpdateFeature(pack));
    }

    dispatch(createAction(ADMIN_BILLING_EDIT_PACKAGE_MODAL, { status: Status.createLoading() }));
    return Promise.all(apiCalls)
      .then(() => {
        dispatch(loadPackages())
          .then(() => {
            dispatch(createAction(ADMIN_BILLING_EDIT_PACKAGE_MODAL, { status: Status.createSuccess() }));
            dispatch(closeEditPackage());
          });
      })
      .catch(error => {
        dispatch(createAction(ADMIN_BILLING_EDIT_PACKAGE_MODAL, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_PACKAGES));
      });
  };
};
