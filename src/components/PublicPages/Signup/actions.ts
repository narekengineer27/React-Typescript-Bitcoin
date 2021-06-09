import * as _ from 'lodash';
import * as api from 'Utils/api';
import { User } from 'Models/User';

import { createAction } from 'Models/Action';
import {
  SIGNUP_STATUS,
  SIGNUP_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_COUNTRIES_LOADED,
  SIGNUP_CURRENCIES_LOADED,
  ALL_COINS_LOADED,
  FETCH_ROLES,
  FETCH_ROLES_ERROR,
  FETCH_ROLES_SUCCESS
} from './types';

import { showMessage, hideMessage } from '../../GlobalMessage/actions';
const MSG_SIGNUP_ERROR = {};
const MSG_COUNTRIES_ERROR = {};
const MSG_CURRENCIES_ERROR = {};
const MSG_COINS_ERROR = {};

export const signup = (user: User) => {
  return (dispatch) => {
    dispatch(createAction(SIGNUP_SIGNUP, user));
    api.signup(user)
      .then(response => {
        dispatch(createAction(SIGNUP_SUCCESS, null));
        dispatch(hideMessage(MSG_SIGNUP_ERROR));
      })
      .catch(error => {
        dispatch(createAction(SIGNUP_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_SIGNUP_ERROR));
      });
  };
};

export const fetchRoles = () => {
  return (dispatch) => {
    dispatch(createAction(FETCH_ROLES, {}));
    api.getRoles()
      .then(response => {
        dispatch(createAction(FETCH_ROLES_SUCCESS, response));
      })
      .catch(error => {
        dispatch(createAction(FETCH_ROLES_ERROR, error));
      });
  };
}

export const loadCountries = () => {
  return (dispatch) => {
    api.countries()
      .then(response => {
        const countries = _.get(response, 'data', {});
        countries.sort((a, b) => (a.country_name || '').localeCompare(b.country_name));
        dispatch(createAction(SIGNUP_COUNTRIES_LOADED, countries));
        dispatch(hideMessage(MSG_COUNTRIES_ERROR));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_COUNTRIES_ERROR));
      });
  };
};

export const loadCurrencies = () => {
  return (dispatch) => {
    api.currencies()
      .then(response => {
        const currencies = _.get(response, 'data', {});
        dispatch(createAction(SIGNUP_CURRENCIES_LOADED, currencies));
        dispatch(hideMessage(MSG_CURRENCIES_ERROR));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_CURRENCIES_ERROR));
      });
  };
};

export const loadAllCoins = (symbol = '') => {
  return (dispatch) => {
    api.getCoins(symbol)
      .then(response => {
        const coins = _.get(response, 'data', {});
        dispatch(createAction(ALL_COINS_LOADED, coins));
        dispatch(hideMessage(MSG_COINS_ERROR));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_COINS_ERROR));
      });
  };
};
