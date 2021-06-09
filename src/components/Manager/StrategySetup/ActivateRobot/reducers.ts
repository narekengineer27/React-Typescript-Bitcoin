import { Status } from 'Models/Status';
import {
  ACTIVATE_ROBOT_CLOSE,
  ACTIVATE_ROBOT_OPEN,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
  activateRobotVisible: false
};

export default (state: IState = initialState, action): IState => {
  switch (action.type) {
    case ACTIVATE_ROBOT_OPEN:
      return {
        ...initialState,
        activateRobotVisible: true,
      };
    case ACTIVATE_ROBOT_CLOSE:
      return {
        ...state, activateRobotVisible: false
      };
    default:
      return {
        ...state,
      };
  }
};
