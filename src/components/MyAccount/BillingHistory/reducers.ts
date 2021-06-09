import { Status } from 'Models/Status';
import {
  BILLING_HISTORY,
  BILLING_HISTORY_STATUS,
  IState
} from './types';

const initialState: IState = {
  billingHistory: {
    data: [],
    status: new Status()
  }
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case BILLING_HISTORY:
      return {
        ...state, billingHistory: {...state.billingHistory, data: action.payload}
      };
    case BILLING_HISTORY_STATUS:
      return {
        ...state, billingHistory: {...state.billingHistory, status: action.payload}
      };
    default:
      return {
        ...state,
      };
  }
};
