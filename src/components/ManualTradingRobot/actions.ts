import * as api from 'Utils/api';
import * as _ from 'lodash';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  MANUAL_TRADING_ROBOT_SWITCH_MODE,
  MANUAL_TRADING_ROBOT_TOTAL,
  MANUAL_TRADING_ROBOT_TOTAL_STATUS,
  MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION, IState,
} from './types';

import { showMessage, hideMessage } from '../GlobalMessage/actions';
import { saveMode } from 'Utils/persistSettings';

const MSG_CURRENCIES_ERROR = {};

export const fetchTotal = (exchangeAccountId, mode: string = 'active') => {
  return (dispatch) => {
    dispatch(createAction(MANUAL_TRADING_ROBOT_TOTAL_STATUS, Status.createLoading()));
    api.total(exchangeAccountId, mode)
      .then(response => {
        dispatch(createAction(MANUAL_TRADING_ROBOT_TOTAL, response.data));
      });
  };
};

export const setMode = (mode: string) => {
  return (dispatch) => {
    dispatch(createAction(MANUAL_TRADING_ROBOT_SWITCH_MODE, mode));
    saveMode(mode);
  };
};

export const loadCurrencyRates = () => {
  return (dispatch, getState) => {
    const currencyConversion = (getState().manualTradingRobot as IState).currencyConversion;
    dispatch(createAction(MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION, { status: Status.createLoading() }));

    const currenciesPromise = new Promise((resolve, reject) => {
      if (currencyConversion.currencyRatesExpiration > new Date()) {
        resolve();
        return;
      }

      api.currencyRates()
        .then(response => {
          const currencyRates = response.data;
          const currencyList: string[] = [];
          const currencyToUsd: { [id: string]: number } = {};
          for (const rate of currencyRates) {
            currencyToUsd[rate.target] = rate.rate;
            currencyList.push(rate.target);
          }

          currencyList.sort();

          const expires = new Date();
          expires.setDate(expires.getDate() + 1);

          dispatch(createAction(
            MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION,
            { currencyRates, currencyToUsd, currencyList, currencyRatesExpiration: expires }));

          resolve();
        })
        .catch(error => reject(error));
    });

    const btcPromise = new Promise((resolve, reject) => {
      if (currencyConversion.btc2usdExpiration > new Date()) {
        resolve();
        return;
      }

      api.btc2usd()
        .then(response => {
          const btc2usd = _.get(response, 'data.bitcoin', {}).price_usd;

          const expires = new Date();
          expires.setMinutes(expires.getMinutes() + 5);

          dispatch(createAction(
            MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION,
            { btc2usd, btc2usdExpiration: expires }));

          resolve();
        })
        .catch(error => reject(error));
    });

    // Wait for all to complete
    return Promise.all([currenciesPromise, btcPromise])
      .then(response => {
        dispatch(hideMessage(MSG_CURRENCIES_ERROR));
        dispatch(createAction(MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION, { status: Status.createSuccess() }));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_CURRENCIES_ERROR));
        dispatch(createAction(MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION, { status: Status.createError() }));
      });
  };
};
