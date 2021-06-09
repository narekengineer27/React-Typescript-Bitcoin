import { Status } from 'Models/Status';
import {
  MENTOR_PROGRAM_REFERRALS,
  MENTOR_PROGRAM_SET_WALLET_MODAL,
  MENTOR_PROGRAM_URL,
  IState
} from './types';

const initialState: IState = {
  referrals: {
    data: { list: [] },
    status: new Status(),
  },
  setWalletModal: {
    visible: false,
    status: new Status(),
  },
  url: {
    data: `${window.location.protocol}//${window.location.host}/#/signup`,
    status: new Status(),
  }
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case MENTOR_PROGRAM_REFERRALS:
      return {
        ...state, referrals: { ...state.referrals, ...action.payload }
      };
    case MENTOR_PROGRAM_SET_WALLET_MODAL:
      return {
        ...state, setWalletModal: { ...state.setWalletModal, ...action.payload }
      };
    case MENTOR_PROGRAM_URL:
      return {
        ...state, url: { ...state.url, ...action.payload }
      };
    default:
      return {
        ...state,
      };
  }
};
