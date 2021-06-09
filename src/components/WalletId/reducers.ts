import { User } from 'Models/User';
import { Status } from 'Models/Status';
import {
  WALLETID_STATUS,
  WALLETID_SETUP,
  WALLETID_AUTH,
  IState,
} from 'Components/WalletId/types';

const initialState: IState = {
  user: new User(),
  status: new Status(),
  auth: false,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case WALLETID_SETUP:
      return {
        ...state,
        status: <Status> {
          loading: true,
        },
        user: <User> {
          ...action.payload,
        },
      };
    case WALLETID_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case WALLETID_AUTH:
      return {
        ...state,
        auth: action.payload,
        status: <Status> {
          loading: false,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
