import { Status } from 'Models/Status';

export const SUBSCRIBE_STATUS = 'SUBSCRIBE_STATUS';
export const SUBSCRIBE_SELECT = 'SUBSCRIBE_SELECT';

export type IState = {
  status: Status,
  selectedPlan: object,
};
