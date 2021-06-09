import { Status } from 'Models/Status';
import { ReferralsData } from 'Models/ReferralsData';

export const MENTOR_PROGRAM_REFERRALS = 'MENTOR_PROGRAM_REFERRALS';
export const MENTOR_PROGRAM_URL = 'MENTOR_PROGRAM_URL';
export const MENTOR_PROGRAM_SET_WALLET_MODAL = 'MENTOR_PROGRAM_SET_WALLET_MODAL';

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
