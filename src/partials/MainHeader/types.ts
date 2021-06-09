import { Status } from 'Models/Status';

export const MAIN_HEADER_SIGN_OUT = 'MAIN_HEADER_SIGN_OUT';
export const MAIN_HEADER_SIGN_OUT_STATUS = 'MAIN_HEADER_SIGN_OUT_STATUS';

export type IState = {
  status: Status,
};
