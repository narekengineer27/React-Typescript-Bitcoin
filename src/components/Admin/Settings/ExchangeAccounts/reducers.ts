import { Status } from 'Models/Status';
import {
  EXCHANGE_ACCOUNTS_STATUS,
  EXCHANGE_ACCOUNTS_ADD_NEW_ACCOUNT_STATUS,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
  add: {
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case EXCHANGE_ACCOUNTS_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case EXCHANGE_ACCOUNTS_ADD_NEW_ACCOUNT_STATUS:
      return {
        ...state,
        add: {
          ...state.add,
          status: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
