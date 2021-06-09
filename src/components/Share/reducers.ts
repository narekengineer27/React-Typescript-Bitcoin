import { Status } from 'Models/Status';
import {
  MENTOR_PROGRAM_REFERRALS,
  MENTOR_PROGRAM_SET_WALLET_MODAL,
  MENTOR_PROGRAM_URL,
  IState,
  FETCH_REFERAL_URL_ERROR,
  FETCH_REFERAL_URL_SUCCESS,
  FETCH_REFERAL_URL,
  FETCH_TOKEN_BALANCE_ERROR,
  FETCH_TOKEN_BALANCE_SUCCESS,
  FETCH_TOKEN_BALANCE
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
        ...state, 
        setWalletModal: { ...state.setWalletModal, ...action.payload }
      };
    case MENTOR_PROGRAM_URL:
      return {
        ...state, url: { ...state.url, ...action.payload }
      };
    case FETCH_REFERAL_URL:
      return {
        ...state,
        referalUrl: {}
      };    
    case FETCH_REFERAL_URL_ERROR:
      return {
        ...state, 
        referalUrl: action.payload
      };
    case FETCH_REFERAL_URL_SUCCESS:
      return {
        ...state, 
        referalUrl: action.payload
      };
    case FETCH_TOKEN_BALANCE_ERROR:
      return {
        ...state, 
        token: action.payload
      };
    case FETCH_TOKEN_BALANCE_SUCCESS:
      return {
        ...state, 
        token: action.payload
      };
    case FETCH_TOKEN_BALANCE:
      return {
        ...state,
        token: {}
      };
    default:
      return {
        ...state,
      };
  }
};
