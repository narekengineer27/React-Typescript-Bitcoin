import { Status } from 'Models/Status';

export const ACTIVATE_ROBOT_CLOSE = 'ACTIVATE_ROBOT_CLOSE';
export const ACTIVATE_ROBOT_OPEN = 'ACTIVATE_ROBOT_OPEN';
export const ACTIVATE_ROBOT_STATUS = 'ACTIVATE_ROBOT_STATUS';

export type IState = {
  status: Status,
  activateRobotVisible: boolean
};
