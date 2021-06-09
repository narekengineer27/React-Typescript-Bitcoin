import { Status } from 'Models/Status';
import { ExchangeAccount } from 'Models/ExchangeAccount';

export const SETTING_INFORMATION_SAVE = 'SETTING_INFORMATION_SAVE';
export const SETTING_INFORMATION_GET = 'SETTING_INFORMATION_GET';
export const SETTING_INFORMATION_SAVE_SUCCESS = 'SETTING_INFORMATION_SAVE_SUCCESS';
export const SETTING_INFORMATION_STATUS = 'SETTING_INFORMATION_STATUS';
export const SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS = 'SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS';
export const SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS = 'SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS';
export const SETTING_ACCONTS_ACCOUNTS = 'SETTING_ACCONTS_ACCOUNTS';
export const SETTING_ACCONTS_STATUS = 'SETTING_ACCONTS_STATUS';

export enum CMBSettingsTabs {
  Exit = 'exit',
  Withdrawal = 'withdrawal',
}

export type IState = {
  status: Status,
  defaultCmbSettings: object,
  tab: CMBSettingsTabs,
  withdrawal: {
    exchangeAccounts: ExchangeAccount[],
    status: Status,
  },
  accounts: {
    exchangeAccounts: ExchangeAccount[],
    status: Status,
  },
};
