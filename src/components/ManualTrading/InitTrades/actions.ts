import { Status } from "Models/Status";
import { createAction } from "Models/Action";
import { Init_TRADES_STATUS } from "./types";

export const importTrades = () => {
  return (dispatch) => {
    dispatch(createAction(Init_TRADES_STATUS, Status.createProgressing()));
  };
};

export const cancelImport = () => {
  return (dispatch) => {
    dispatch(createAction(Init_TRADES_STATUS, new Status()));
  };
};
