import { Status } from 'Models/Status';
import {
  FORGOT_PASSWORD_RESET,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_RESET:
      return {
        ...state, status: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
