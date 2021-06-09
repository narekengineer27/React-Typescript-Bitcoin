import { Status } from 'Models/Status';
import {
  ADMIN_BILLING_PACKAGES,
  ADMIN_BILLING_EDIT_PACKAGE_MODAL,
  IState,
} from './types';

const initialState: IState = {
  packages: {
    data: [],
    status: new Status(),
  },
  editPackageModal: {
    visible: false,
    pack: {},
    status: new Status(),
  }
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case ADMIN_BILLING_PACKAGES:
      return { ...state, packages: { ...state.packages, ...action.payload } };
    case ADMIN_BILLING_EDIT_PACKAGE_MODAL:
      return { ...state, editPackageModal: { ...state.editPackageModal, ...action.payload } };
    default:
      return {
        ...state,
      };
  }
};
