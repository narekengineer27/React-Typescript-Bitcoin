import { Status } from 'Models/Status';
import {
  PLATFORM_FEATURES_PACKAGES,
  PLATFORM_FEATURES_USER_PACKAGE,
  PLATFORM_FEATURES_PURCHASE_FEATURE,
  PLATFORM_FEATURES_SCRATCH_CARD_MODAL,
  PLATFORM_FEATURES_ACTIVATE_LIVE_MODAL,
  IState,
} from './types';

const initialState: IState = {
  packages: {
    data: { packages: [] },
    status: new Status(),
  },
  userPackage: {
    data: {},
    status: new Status(),
  },
  purchaseFeatureModal: {
    visible: false,
  },
  scratchCardModal: {
    visible: false,
  },
  activateLiveModal: {
    visible: false,
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case PLATFORM_FEATURES_PACKAGES:
      return {
        ...state, packages: { ...state.packages, ...action.payload }
      };
    case PLATFORM_FEATURES_USER_PACKAGE:
      return {
        ...state, userPackage: { ...state.userPackage, ...action.payload }
      };
    case PLATFORM_FEATURES_PURCHASE_FEATURE:
      return {
        ...state, purchaseFeatureModal: { ...state.purchaseFeatureModal, ...action.payload }
      };
    case PLATFORM_FEATURES_SCRATCH_CARD_MODAL:
      return {
        ...state, scratchCardModal: { ...state.scratchCardModal, ...action.payload }
      };
    case PLATFORM_FEATURES_ACTIVATE_LIVE_MODAL:
      return {
        ...state, activateLiveModal: { ...state.activateLiveModal, ...action.payload }
      };
    default:
      return {
        ...state,
      };
  }
};
