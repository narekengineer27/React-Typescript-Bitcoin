import { Status } from 'Models/Status';
import { User } from 'Models/User';

export const WALLETID_STATUS = 'WALLETID_STATUS';
export const WALLETID_SETUP = 'WALLETID_SETUP';
export const WALLETID_AUTH = 'WALLETID_AUTH';

export type IState = {
  status: Status,
  user: User,
  auth: boolean, 
};
