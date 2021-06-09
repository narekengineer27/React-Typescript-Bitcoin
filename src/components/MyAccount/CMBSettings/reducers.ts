import { Status } from 'Models/Status';
import {
  SETTING_INFORMATION_STATUS,
  SETTING_INFORMATION_GET,
  CMBSettingsTabs,
  SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS,
  SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS,
  SETTING_ACCONTS_ACCOUNTS,
  SETTING_ACCONTS_STATUS,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
  defaultCmbSettings: {},
  tab: CMBSettingsTabs.Exit,
  withdrawal: {
    exchangeAccounts: [],
    status: new Status(),
  },
  accounts: {
    exchangeAccounts: [],
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case SETTING_INFORMATION_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SETTING_INFORMATION_GET:
      return {
        ...state,
        defaultCmbSettings: action.payload,
      };
    case SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS:
      return {
        ...state,
        withdrawal: {
          ...state.withdrawal,
          exchangeAccounts: action.payload,
        },
      };
    case SETTING_WITHDRAWAL_EXCHANGE_ACCOUNTS_STATUS:
      return {
        ...state,
        withdrawal: {
          ...state.withdrawal,
          status: action.payload,
        },
      };
    case SETTING_ACCONTS_ACCOUNTS:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          exchangeAccounts: action.payload,
        },
      };
    case SETTING_ACCONTS_STATUS:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          status: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
