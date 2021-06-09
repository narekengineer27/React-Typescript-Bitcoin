import { Status } from "Models/Status";
import { Init_TRADES_STATUS, IState } from "./types";

const initialState: IState = {
  status: new Status(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case Init_TRADES_STATUS:
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
