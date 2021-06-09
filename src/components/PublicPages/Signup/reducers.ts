import { User } from 'Models/User';
import { Status } from 'Models/Status';
import {
  SIGNUP_STATUS,
  SIGNUP_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_COUNTRIES_LOADED,
  SIGNUP_CURRENCIES_LOADED,
  ALL_COINS_LOADED,
  FETCH_ROLES,
  FETCH_ROLES_ERROR,
  FETCH_ROLES_SUCCESS,
  IState,
} from './types';

const initialState: IState = {
  user: new User(),
  status: new Status(),
  countries: [],
  currencies: [],
  coins: []
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SIGNUP:
      return {
        ...state,
        status: <Status>{
          loading: true,
        },
        user: <User>{
          ...action.payload,
        },
      };
    case SIGNUP_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        status: <Status>{
          loading: false,
          success: true,
        },
      };
    case SIGNUP_COUNTRIES_LOADED:
      return {
        ...state,
        countries: action.payload,
      };
    case SIGNUP_CURRENCIES_LOADED:
      return {
        ...state,
        currencies: action.payload,
      };
    case ALL_COINS_LOADED:
      return {
        ...state,
        coins: action.payload,
      };
    case FETCH_ROLES:
      return {
        ...state,
        preSignup: {
          roles: action.payload,
          status: {
            loading: true,
          }
        }
      }
    case FETCH_ROLES_ERROR:
      return {
        ...state,
        preSignup: {
          roles: action.payload,
          status: {
            loading: false,
            error: true
          }
        }
      }
    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        preSignup: {
          roles: action.payload,
          status: {
            loading: false,
            success: true
          }
        }
      }
    default:
      return {
        ...state,
      };
  }
};
