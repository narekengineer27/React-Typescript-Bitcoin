import { Status } from 'Models/Status';
import {
  TWO_FACTOR_CONFIRM_STATUS,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case TWO_FACTOR_CONFIRM_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
