import { Status } from 'Models/Status';


export const EXECUTION_TRADES_DATA = 'EXECUTION_TRADES_DATA';
export const EXECUTION_TRADES_STATUS = 'EXECUTION_TRADES_STATUS';
export const EXECUTION_DEACTIVATE_ROBOT_STATUS = 'EXECUTION_DEACTIVATE_ROBOT_STATUS';


export type IState = {
  trades: {
    data: object[],
    status: Status,
  };
  deactivateRobot: {
    status: Status,
  },
};

