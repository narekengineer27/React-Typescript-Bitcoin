import { ExchangeAccount } from 'Models/ExchangeAccount';
import { Status } from 'Models/Status';

export const EXCHANGE_ACCOUNTS_SAVE_STATUS = 'EXCHANGE_ACCOUNTS_SAVE_STATUS';
export const EXCHANGE_ACCOUNTS_DELETE_STATUS = 'EXCHANGE_ACCOUNTS_DELETE_STATUS';
export const EXCHANGE_ACCOUNTS_EDIT_ACCOUNT = 'EXCHANGE_ACCOUNTS_EDIT_ACCOUNT';
export const EXCHANGE_ACCOUNTS_DELETE_ACCOUNT = 'EXCHANGE_ACCOUNTS_DELETE_ACCOUNT';
export const EXCHANGE_ACCOUNTS_MANAGE_ACCOUNTS = 'EXCHANGE_ACCOUNTS_MANAGE_ACCOUNTS';
export const EXCHANGE_ACCOUNTS_CLOSE = 'EXCHANGE_ACCOUNTS_CLOSE';
export const EXCHANGE_ACCOUNTS_CREATE_DIRECTLY = 'EXCHANGE_ACCOUNTS_CREATE_DIRECTLY';

export type IState = {
  visible?: boolean;
  editedAccount?: ExchangeAccount;
  deletedAccount?: ExchangeAccount;
  saveStatus: Status;
  deleteStatus: Status;
  skipManage?: boolean;
};
