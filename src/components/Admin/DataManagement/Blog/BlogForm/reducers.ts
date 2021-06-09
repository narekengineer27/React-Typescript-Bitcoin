
import { Status } from 'Models/Status';
import {
  BLOG_FORM_ADD_STATUS,
  BLOG_FORM_ADD_SAVE,
  BLOG_FORM_ADD_SUCCESS,
  BLOG_FORM_EDIT_STATUS,
  BLOG_FORM_EDIT_RECORD,
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
    case BLOG_FORM_ADD_SAVE:
      return {
        ...state,
        status: <Status>{
          loading: true,
        },
      };
    case BLOG_FORM_ADD_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case BLOG_FORM_ADD_SUCCESS:
      return {
        ...state,
        status: <Status>{
          loading: false,
          success: true,
        },
      };
    case BLOG_FORM_EDIT_STATUS:
      return {
        ...state,
        edit: {
          ...state.edit,
          status: action.payload,
        },
      };
    case BLOG_FORM_EDIT_RECORD:
      return {
        ...state,
        edit: {
          ...state.edit,
          record: {...action.payload},
        },
      };
    default:
      return {
        ...state,
      };
  }
};
