import { Status } from 'Models/Status';

import {
  EXCHANGE_ACCOUNTS_EDIT_ACCOUNT,
  EXCHANGE_ACCOUNTS_MANAGE_ACCOUNTS,
  EXCHANGE_ACCOUNTS_CLOSE,
  EXCHANGE_ACCOUNTS_DELETE_STATUS,
  EXCHANGE_ACCOUNTS_DELETE_ACCOUNT,
  EXCHANGE_ACCOUNTS_SAVE_STATUS,
  EXCHANGE_ACCOUNTS_CREATE_DIRECTLY,
  IState,
} from './types';

const initialState: IState = {
  deleteStatus: new Status(),
  saveStatus: new Status(),
};

export default (state: IState = initialState, action): IState => {
  switch (action.type) {
    case EXCHANGE_ACCOUNTS_EDIT_ACCOUNT:
      return {
        ...state, editedAccount: action.payload
      };
    case EXCHANGE_ACCOUNTS_MANAGE_ACCOUNTS:
      return {
        ...state, visible: true
      };
    case EXCHANGE_ACCOUNTS_DELETE_STATUS:
      return {
        ...state, deleteStatus: action.payload
      };
    case EXCHANGE_ACCOUNTS_SAVE_STATUS:
      return {
        ...state, saveStatus: action.payload
      };
    case EXCHANGE_ACCOUNTS_CLOSE:
      return {
        ...state, visible: !!state.editedAccount && !state.skipManage, editedAccount: null, skipManage: null
      };
    case EXCHANGE_ACCOUNTS_CREATE_DIRECTLY:
      return { ...state, skipManage: true, visible: true, editedAccount: {} };
    case EXCHANGE_ACCOUNTS_DELETE_ACCOUNT:
      return {
        ...state, 
        deletedAccount: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
