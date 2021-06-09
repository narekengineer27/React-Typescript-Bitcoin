import { Status } from 'Models/Status';

import {
  SUBSCRIBE_STATUS,
  SUBSCRIBE_SELECT,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
  selectedPlan: {},
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SUBSCRIBE_SELECT:
      return {
        ...state,
        selectedPlan: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
