import * as api from 'Utils/api';
import * as _ from 'lodash';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { Trade } from 'Models/Trade';
import { exitStrategyHasBeenSet } from 'Utils/auth';
import { saveSettings, getCurrentSettings } from 'Components/MyAccount/CMBSettings/actions';
import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';

import {
  EXIT_STRATEGY_TRADE,
  EXIT_STRATEGY_STATUS,
  EXIT_STRATEGY_DEFAULTS,
  EXIT_STRATEGY_DEFAULTS_STATUS,
  EXIT_STRATEGY_SET_AS_DEFAULT,
  EXIT_STRATEGY_SET_FROM,
} from './types';

const exitStrategyFields = [
  'exit_target',
  'smart_sell_enabled',
  'smart_sell_interval',
  'smart_sell_drops',
  'exit_notified_by_email',
  'exit_notified_by_sms',
];

const MSG_SAVING_ERROR = {};
const MSG_SAVING_SUCCESS = {};
const MSG_GET_DEFAULT_ERROR = {};

export const openExitStrategy = (trade: Trade, from = '') => {
  return (dispatch) => {
    dispatch(createAction(EXIT_STRATEGY_STATUS, Status.createProgressing()));
    dispatch(createAction(EXIT_STRATEGY_TRADE, trade));
    if (from) {
      dispatch(createAction(EXIT_STRATEGY_SET_FROM, from));
    }
  };
};

export const cancelExitStrategy = () => {
  return (dispatch) => {
    dispatch(createAction(EXIT_STRATEGY_STATUS, new Status()));
  };
};

export const saveDefaultExitStrategy = (values) => {
  return (dispatch) => {
    dispatch(createAction(EXIT_STRATEGY_STATUS, {
      progressing: true,
      loading: true,
    }));

    const valuesToSubmit = _.pick(values, exitStrategyFields);
    dispatch(saveSettings(valuesToSubmit)).then(() => {
      dispatch(createAction(EXIT_STRATEGY_STATUS, Status.createSuccess()));
      dispatch(getCurrentSettings());
      exitStrategyHasBeenSet();
    }).catch(() => {
      dispatch(createAction(EXIT_STRATEGY_STATUS, Status.createError()));
    });
  };
};

export const updateExitStrategy = (trade, values, setAsDefault = false) => {
  return (dispatch) => {
    dispatch(createAction(EXIT_STRATEGY_STATUS, {
      progressing: true,
      loading: true,
    }));
    const valuesToSubmit = _.pick(values, exitStrategyFields);
    api.updateStrategy(trade.id, valuesToSubmit)
      .then(response => {
        dispatch(hideMessage(MSG_SAVING_ERROR));
        dispatch(createAction(EXIT_STRATEGY_STATUS, Status.createSuccess()));
        dispatch(showMessage('You have updated the exit strategy successfully!', 'success', MSG_SAVING_SUCCESS));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_SAVING_ERROR));
        dispatch(createAction(EXIT_STRATEGY_STATUS, Status.createProgressing()));
      });
    setAsDefault && dispatch(saveDefaultExitStrategy(values));
  };
};

export const saveExitStrategy = (trade, mode, values, exchangeAccountId, setAsDefault = false) => {
  return (dispatch) => {
    dispatch(createAction(EXIT_STRATEGY_STATUS, {
      progressing: true,
      loading: true,
    }));
    const valuesToSubmit = _.pick(values, exitStrategyFields);
    if (exchangeAccountId) {
      valuesToSubmit.exchange_account_id = exchangeAccountId;
    }

    const promise = valuesToSubmit.smart_sell_enabled ?
      api.saveStrategy(trade.id, mode, valuesToSubmit)
      : api.updateTradeTarget(trade.id, valuesToSubmit.exit_target);
    promise
      .then(() => {
        dispatch(hideMessage(MSG_SAVING_ERROR));
        dispatch(createAction(EXIT_STRATEGY_STATUS, Status.createSuccess()));
        dispatch(showMessage('You have saved the exit strategy successfully!', 'success', MSG_SAVING_SUCCESS));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_SAVING_ERROR));
        dispatch(createAction(EXIT_STRATEGY_STATUS, Status.createProgressing()));
      });
    setAsDefault && dispatch(saveDefaultExitStrategy(values));
  };
};

export const loadDefaultSettings = () => {
  return (dispatch) => {
    dispatch(createAction(EXIT_STRATEGY_DEFAULTS_STATUS, Status.createLoading()));
    api.getCMBSettings()
      .then(response => {
        const data = response.data;
        dispatch(createAction(EXIT_STRATEGY_DEFAULTS, _.pick(data, exitStrategyFields)));
        dispatch(createAction(EXIT_STRATEGY_DEFAULTS_STATUS, Status.createSuccess()));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_GET_DEFAULT_ERROR));
        dispatch(createAction(EXIT_STRATEGY_DEFAULTS_STATUS, new Status()));
      });
  };
};

export const setAsDefault = (setAsDefault) => {
  return (dispatch) => {
    dispatch(createAction(EXIT_STRATEGY_SET_AS_DEFAULT, setAsDefault));
  };
};
