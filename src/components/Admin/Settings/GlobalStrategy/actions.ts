import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  GLOBAL_STRATEGY_APPROACH_SAVE,
  GLOBAL_STRATEGY_APPROACH_GET,
  GLOBAL_STRATEGY_APPROACH_SAVE_SUCCESS,
  GLOBAL_STRATEGY_APPROACH_STATUS,
  GLOBAL_STRATEGY_SWITCH_TABS,
  GlobalStrategyTabs,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_ERROR = {};

export const saveSetting = (globalStrategy: any) => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_STRATEGY_APPROACH_STATUS, Status.createLoading()));
    dispatch(createAction(GLOBAL_STRATEGY_APPROACH_SAVE, globalStrategy));
    return api.saveGlobalStrategy()
      .then(response => {
        dispatch(createAction(GLOBAL_STRATEGY_APPROACH_SAVE_SUCCESS, null));
        dispatch(hideMessage(MSG_ERROR));
        dispatch(createAction(GLOBAL_STRATEGY_APPROACH_STATUS, Status.createSuccess()));
        dispatch(showMessage('Approach saved successfully.', 'success', MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(GLOBAL_STRATEGY_APPROACH_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const getSetting = () => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_STRATEGY_APPROACH_STATUS, Status.createLoading()));
    api.getGlobalStrategy()
      .then(response => {
        const data = {};//response.data;
        [
          'smart_sell_enabled',
          'exit_notified_by_email',
          'exit_notified_by_sms',
        ].forEach((field) => {
          data[field] = !!data[field];
        });
        dispatch(createAction(GLOBAL_STRATEGY_APPROACH_GET, data));
        dispatch(hideMessage(MSG_ERROR));
        dispatch(createAction(GLOBAL_STRATEGY_APPROACH_STATUS, Status.createSuccess()));
      })
      .catch(error => {
        dispatch(createAction(GLOBAL_STRATEGY_APPROACH_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const switchTab = (tab) => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_STRATEGY_SWITCH_TABS, tab))
  };
};

export const goToExitTab = () => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_STRATEGY_SWITCH_TABS, GlobalStrategyTabs.Exit));
  };
};

export const goToEntryTab = () => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_STRATEGY_SWITCH_TABS, GlobalStrategyTabs.Entry));
  };
};
