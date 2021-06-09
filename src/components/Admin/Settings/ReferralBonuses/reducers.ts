import { Status } from 'Models/Status';
import {
  ADMIN_REFERRAL_BONUSES_UNPAID,
  ADMIN_REFERRAL_BONUSES_PAID,
  ADMIN_REFERRAL_BONUSES_MARK_PAID,
  IState,
} from './types';
import { Meta } from 'Models/Meta';

const initialState: IState = {
  unpaid: {
    data: [],
    status: new Status(),
    meta: Meta.createWithLimit(30),
  },
  paid: {
    data: [],
    status: new Status(),
    meta: Meta.createWithLimit(30),
  },
  markPaid: {
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case ADMIN_REFERRAL_BONUSES_UNPAID:
      return { ...state, unpaid: { ...state.unpaid, ...action.payload } };
    case ADMIN_REFERRAL_BONUSES_PAID:
      return { ...state, paid: { ...state.paid, ...action.payload } };
    case ADMIN_REFERRAL_BONUSES_MARK_PAID:
      return { ...state, markPaid: { ...state.markPaid, ...action.payload } };
    default:
      return {
        ...state,
      };
  }
};
