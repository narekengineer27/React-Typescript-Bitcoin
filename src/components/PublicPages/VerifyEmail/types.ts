import { Status } from 'Models/Status';

export const VERIFY_EMAIL_VERIFY = 'VERIFY_EMAIL_VERIFY';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE';

export type IState = {
  status: Status,
};
