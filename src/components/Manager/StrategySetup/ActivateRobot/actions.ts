import { createAction } from 'Models/Action';
import { hideAllMessages } from 'Components/GlobalMessage/actions';

import {
  ACTIVATE_ROBOT_CLOSE,
  ACTIVATE_ROBOT_OPEN,
} from './types';

export const open = () => {
  return dispatch => {
    dispatch(hideAllMessages());
    dispatch(createAction(ACTIVATE_ROBOT_OPEN, {activateRobotVisible: true}));
  };
};

export const close = () => {
  return dispatch => {
    dispatch(hideAllMessages());
    dispatch(createAction(ACTIVATE_ROBOT_CLOSE, {activateRobotVisible: false}));
  };
};
