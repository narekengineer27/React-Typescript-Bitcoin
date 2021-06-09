import { Status } from 'Models/Status';
import {
  MAIN_HEADER_SIGN_OUT,
  MAIN_HEADER_SIGN_OUT_STATUS,
  IState,
} from 'Components/MainHeader/types';

const initialState: IState = {
  status: new Status(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case MAIN_HEADER_SIGN_OUT:
      return {
        status: <Status> {
          loading: true,
        },
      };
    case MAIN_HEADER_SIGN_OUT_STATUS:
      return {
        status: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
