import { Status } from 'Models/Status';
import { User } from 'Models/User';

export const LOGIN_STATUS = 'LOGIN_STATUS';
export const LOGIN_LOGIN = 'LOGIN_LOGIN';
export const LOGIN_AUTH = 'LOGIN_AUTH';
export const LOGIN_TWO_FACTOR_ENABLED = 'LOGIN_TWO_FACTOR_ENABLED';
export const LOGIN_TWO_FACTOR_CODE = 'LOGIN_TWO_FACTOR_CODE';
export const LOGIN_TWO_FACTOR_STATUS = 'LOGIN_TWO_FACTOR_STATUS';

export type IState = {
  status: Status,
  user: User,
  auth: boolean, // login successfully if `auth` is `true`.
  twoFactorEnabled: boolean, //
  code: {
    status: Status,
    message: object,
  },
};
