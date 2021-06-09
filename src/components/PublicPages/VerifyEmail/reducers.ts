import { Status } from 'Models/Status';
import {
  VERIFY_EMAIL_VERIFY,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case VERIFY_EMAIL_VERIFY:
      return {
        ...state,
        status: {
          loading: true,
        }
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        status: { loading: false, success: true },
      };
    case VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        status: { loading: false, error: true },
      };
    default:
      return {
        ...state,
      };
  }
};
