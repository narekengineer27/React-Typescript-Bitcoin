import { Status } from 'Models/Status';
import {
  ACCOUNT_INFORMATION_STATUS,
  ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION,
  ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS,
  ACCOUNT_INFORMATION_TWO_FACTOR_STATUS,
  ACCOUNT_INFORMATION_TWO_FACTOR_ENABLED,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
  googleAuthentication: {
    status: new Status(),
    data: {},
  },
  twoFactor: {
    status: new Status(),
    enabled_2fa: 0,
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INFORMATION_STATUS:
      return {
        ...state,
        status: action.payload
      };
    case ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION_STATUS:
      return {
        ...state,
        googleAuthentication: {
          ...state.googleAuthentication,
          status: action.payload,
        },
      };
    case ACCOUNT_INFORMATION_GOOGLE_AUTHENTICATION:
      return {
        ...state,
        googleAuthentication: {
          ...state.googleAuthentication,
          data: {...action.payload},
        },
      };
    case ACCOUNT_INFORMATION_TWO_FACTOR_STATUS:
      return {
        ...state,
        twoFactor: {
          ...state.twoFactor,
          status: action.payload,
        },
      };
    case ACCOUNT_INFORMATION_TWO_FACTOR_ENABLED:
      return {
        ...state,
        twoFactor: {
          ...state.twoFactor,
          enabled_2fa: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
