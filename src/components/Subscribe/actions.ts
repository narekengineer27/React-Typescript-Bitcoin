import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  SUBSCRIBE_STATUS,
  SUBSCRIBE_SELECT,
} from './types';

export const subscriptionPlanDetails = (selectedPlan) => {
  return (dispatch) => {
    dispatch(createAction(SUBSCRIBE_STATUS, Status.createProgressing()));
    dispatch(createAction(SUBSCRIBE_SELECT, selectedPlan));
  };
};

export const cancelPayment = () => {
  return (dispatch) => {
    dispatch(createAction(SUBSCRIBE_STATUS, new Status()));
  };
};

export const confirmPayment = () => {
  return (dispatch) => {
    dispatch(createAction(SUBSCRIBE_STATUS, new Status()));
  };
};
