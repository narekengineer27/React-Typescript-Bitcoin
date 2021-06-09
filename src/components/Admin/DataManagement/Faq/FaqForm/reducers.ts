
import { Status } from 'Models/Status';
import {
  FAQ_FORM_ADD_STATUS,
  FAQ_FORM_ADD_SAVE,
  FAQ_FORM_ADD_SUCCESS,
  FAQ_FORM_EDIT_STATUS,
  FAQ_FORM_EDIT_RECORD,
  IState,
} from './types';

const initialState: IState = {
  record: {},
  status: new Status(),
  edit: {
    record: {},
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case FAQ_FORM_ADD_SAVE:
      return {
        ...state,
        status: <Status>{
          loading: true,
        },
      };
    case FAQ_FORM_ADD_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case FAQ_FORM_ADD_SUCCESS:
      return {
        ...state,
        status: <Status>{
          loading: false,
          success: true,
        },
      };
    case FAQ_FORM_EDIT_STATUS:
      return {
        ...state,
        edit: {
          ...state.edit,
          status: action.payload,
        },
      };
    case FAQ_FORM_EDIT_RECORD:
      return {
        ...state,
        edit: {
          ...state.edit,
          record: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
