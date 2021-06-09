import {
  HEARTBEAT_PULSE,
  IState,
} from './types';

const initialState: IState = {
  alive: true,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case HEARTBEAT_PULSE:
      return {
        ...state,
        alive: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
