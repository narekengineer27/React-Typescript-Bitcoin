import { Status } from 'Models/Status';
import { ReferralsData } from 'Models/ReferralsData';

export const MENTOR_PROGRAM_REFERRALS = 'MENTOR_PROGRAM_REFERRALS';
export const MENTOR_PROGRAM_URL = 'MENTOR_PROGRAM_URL';
export const MENTOR_PROGRAM_SET_WALLET_MODAL = 'MENTOR_PROGRAM_SET_WALLET_MODAL';

export const FETCH_REFERAL_URL = 'FETCH_REFERAL_URL';
export const FETCH_REFERAL_URL_SUCCESS = 'FETCH_REFERAL_URL_SUCCESS';
export const FETCH_REFERAL_URL_ERROR = 'FETCH_REFERAL_URL_ERROR';

export const FETCH_TOKEN_BALANCE = 'FETCH_TOKEN_BALANCE';
export const FETCH_TOKEN_BALANCE_SUCCESS = 'FETCH_TOKEN_BALANCE_SUCCESS';
export const FETCH_TOKEN_BALANCE_ERROR = 'FETCH_TOKEN_BALANCE_ERROR';

export type IState = {
  referrals: {
    data: ReferralsData;
    status: Status;
  },
  setWalletModal: {
    visible: boolean;
    status: Status;
  },
  url: {
    data: string;
    status: Status;
  }
};