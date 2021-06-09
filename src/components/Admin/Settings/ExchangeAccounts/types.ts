import { Status } from 'Models/Status';

export const EXCHANGE_ACCOUNTS_STATUS = 'EXCHANGE_ACCOUNTS_STATUS';
export const EXCHANGE_ACCOUNTS_ADD_NEW_ACCOUNT_STATUS = 'EXCHANGE_ACCOUNTS_ADD_NEW_ACCOUNT_STATUS';

export type IState = {
  status: Status,
  add: {
    status: Status,
  },
};
