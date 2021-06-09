import { Status } from "Models/Status";
import {
  EXECUTION_TRADES_DATA,
  EXECUTION_TRADES_STATUS,
  EXECUTION_DEACTIVATE_ROBOT_STATUS,
  IState,
} from "./types";

const initialState: IState = {
  trades: {
    data: [],
    status: new Status(),
  },
  deactivateRobot: {
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case EXECUTION_TRADES_DATA:
      return {
        ...state,
        trades: {
          data: action.payload,
          status: Status.createSuccess(),
        },
      };
    case EXECUTION_TRADES_STATUS:
      return {
        ...state,
        trades: {
          ...state.trades,
          status: action.payload,
        },
      };
    case EXECUTION_DEACTIVATE_ROBOT_STATUS:
      return {
        ...state,
        deactivateRobot: {
          ...state.deactivateRobot,
          status: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

