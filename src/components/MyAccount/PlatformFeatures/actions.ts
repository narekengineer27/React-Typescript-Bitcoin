import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';

import {
  PLATFORM_FEATURES_PACKAGES,
  PLATFORM_FEATURES_USER_PACKAGE,
  PLATFORM_FEATURES_PURCHASE_FEATURE,
  PLATFORM_FEATURES_SCRATCH_CARD_MODAL,
  PLATFORM_FEATURES_ACTIVATE_LIVE_MODAL,
} from './types';

import { hideMessage, showMessage } from 'Components/GlobalMessage/actions';
import { Package } from 'Models/Package';
import { getCurrentUser } from 'Utils/auth';
import { UserPackage } from 'Models/UserPackage';
import { setMode } from 'Components/ManualTradingRobot/actions';

const MSG_PACKAGES = {};

export const loadPackages = () => {
  return (dispatch) => {
    dispatch(createAction(PLATFORM_FEATURES_PACKAGES, { status: Status.createLoading() }));
    api.billingPackageData()
      .then(response => {
        const data = response.data;
        dispatch(createAction(PLATFORM_FEATURES_PACKAGES, { data, status: Status.createSuccess() }));
        dispatch(hideMessage(MSG_PACKAGES));
      })
      .catch(error => {
        dispatch(createAction(PLATFORM_FEATURES_PACKAGES, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_PACKAGES));
      });
  };
};

export const loadUserPackage = () => {
  return (dispatch) => {
    dispatch(createAction(PLATFORM_FEATURES_USER_PACKAGE, { status: Status.createLoading() }));
    api.billingUserPackage()
      .then(response => {
        const data = response.data as UserPackage;
        dispatch(createAction(PLATFORM_FEATURES_USER_PACKAGE, { data, status: Status.createSuccess() }));
        dispatch(hideMessage(MSG_PACKAGES));

        if (!getCurrentUser().is_dev) {
          // Automatically change the mode to match what is enabled in the active user purchases
          const liveAccess = (data.all_live_enabled && !data.all_expired) ||
            (data.exchanges && data.exchanges.find(item => item.live_enabled && !item.live_expired));

          const testAccess = data.test_enabled && !data.test_expired;

          if (liveAccess && !testAccess) {
            dispatch(setMode('active'));
          } else if (!liveAccess && testAccess) {
            dispatch(setMode('test'));
          }
        }
      })
      .catch(error => {
        dispatch(createAction(PLATFORM_FEATURES_USER_PACKAGE, { status: Status.createError() }));
        dispatch(showMessage(error, 'error', MSG_PACKAGES));
      });
  };
};

export const openPurchaseFeatureModal = (pack: Package) => {
  return dispatch => {
    dispatch(createAction(PLATFORM_FEATURES_PURCHASE_FEATURE, {
      visible: true,
      pack,
      buy: null,
    }));
  };
};

export const closePurchaseFeatureModal = () => {
  return dispatch => {
    dispatch(createAction(PLATFORM_FEATURES_PURCHASE_FEATURE, {
      visible: false,
    }));
  };
};

export const submitPurchaseFeatureModal = (quantity: string, exchange?: string, packageId?: number) => {
  return (dispatch) => {
    if (quantity.endsWith('.')) {
      // Test mode - Development HACK - should not work on live
      api.billingTestPurchase(packageId, +quantity, exchange)
        .then(() => {
          dispatch(closePurchaseFeatureModal());
          dispatch(loadUserPackage());
          dispatch(hideMessage(MSG_PACKAGES));
        })
        .catch(error => {
          dispatch(showMessage(error, 'error', MSG_PACKAGES));
        });
    } else {
      dispatch(createAction(PLATFORM_FEATURES_PURCHASE_FEATURE, {
        buy: { quantity, exchange },
      }));
    }
  };
};

// Activate via scratch card modal

export const openScratchCardModal = () => {
  return dispatch => {
    dispatch(createAction(PLATFORM_FEATURES_SCRATCH_CARD_MODAL, { visible: true }));
  };
};

export const closeScratchCardModal = () => {
  return dispatch => {
    dispatch(createAction(PLATFORM_FEATURES_SCRATCH_CARD_MODAL, { visible: false }));
  };
};

export const submitScratchCardModal = (code: string) => {
  return dispatch => {
    dispatch(closeScratchCardModal());
    api.billingScratchCode(code)
      .then(() => {
        dispatch(closeScratchCardModal());
        dispatch(hideMessage(MSG_PACKAGES));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_PACKAGES));
      });
  };
};

// Activate live day modal

export const openActivateLiveModal = () => {
  return dispatch => {
    dispatch(createAction(PLATFORM_FEATURES_ACTIVATE_LIVE_MODAL, { visible: true }));
  };
};

export const closeActivateLiveModal = () => {
  return dispatch => {
    dispatch(createAction(PLATFORM_FEATURES_ACTIVATE_LIVE_MODAL, { visible: false }));
  };
};

export const submitActivateLiveModal = (exchange: string) => {
  return dispatch => {
    api.billingActivateLiveMode(exchange)
      .then(() => {
        dispatch(closeActivateLiveModal());
        dispatch(loadUserPackage());
        dispatch(hideMessage(MSG_PACKAGES));
      })
      .catch(error => {
        dispatch(closeActivateLiveModal());
        dispatch(showMessage(error, 'error', MSG_PACKAGES));
      });
  };
};
