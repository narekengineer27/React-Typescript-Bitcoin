import { User } from 'Models/User';
import { Status } from 'Models/Status';
import {
  LOGIN_STATUS,
  LOGIN_LOGIN,
  LOGIN_AUTH,
  LOGIN_TWO_FACTOR_ENABLED,
  LOGIN_TWO_FACTOR_STATUS,
  LOGIN_TWO_FACTOR_CODE,
  IState,
} from 'Components/PublicPages/Login/types';

const initialState: IState = {
  user: new User(),
  status: new Status(),
  auth: false,
  twoFactorEnabled: false,
  code: {
    status: new Status(),
    message: {},
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOGIN:
      return {
        ...state,
        status: <Status> {
          loading: true,
        },
        user: <User> {
          ...action.payload,
        },
      };
    case LOGIN_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case LOGIN_AUTH:
      return {
        ...state,
        auth: action.payload,
        status: <Status> {
          loading: false,
        },
      };
    case LOGIN_TWO_FACTOR_STATUS:
      return {
        ...state,
        code: {
          ...state.code,
          status: action.payload,
        },
      };
    case LOGIN_TWO_FACTOR_CODE:
      return {
        ...state,
        code: {
          ...state.code,
          message: action.payload,
        },
      };
    case LOGIN_TWO_FACTOR_ENABLED:
      return {
        ...state,
        twoFactorEnabled: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
