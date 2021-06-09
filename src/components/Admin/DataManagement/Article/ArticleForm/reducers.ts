
import { Status } from 'Models/Status';
import {
  ARTICLE_FORM_ADD_STATUS,
  ARTICLE_FORM_ADD_SAVE,
  ARTICLE_FORM_ADD_SUCCESS,
  ARTICLE_FORM_EDIT_STATUS,
  ARTICLE_FORM_EDIT_RECORD,
  IState,
} from './types';

const initialState: IState = {
  article: {},
  status: new Status(),
  edit: {
    record: {},
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case ARTICLE_FORM_ADD_SAVE:
      return {
        ...state,
        status: <Status>{
          loading: true,
        },
      };
    case ARTICLE_FORM_ADD_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case ARTICLE_FORM_ADD_SUCCESS:
      return {
        ...state,
        status: <Status>{
          loading: false,
          success: true,
        },
      };
    case ARTICLE_FORM_EDIT_STATUS:
      return {
        ...state,
        edit: {
          ...state.edit,
          status: action.payload,
        },
      };
    case ARTICLE_FORM_EDIT_RECORD:
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
